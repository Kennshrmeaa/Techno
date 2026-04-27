param(
    [Parameter(Mandatory = $true)]
    [string]$Root,

    [int]$Port = 3000
)

$ErrorActionPreference = 'Stop'
$resolvedRoot = (Resolve-Path $Root).Path
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)

$mimeTypes = @{
    '.css' = 'text/css; charset=utf-8'
    '.html' = 'text/html; charset=utf-8'
    '.ico' = 'image/x-icon'
    '.jpeg' = 'image/jpeg'
    '.jpg' = 'image/jpeg'
    '.js' = 'application/javascript; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.png' = 'image/png'
    '.svg' = 'image/svg+xml'
    '.txt' = 'text/plain; charset=utf-8'
    '.webp' = 'image/webp'
}

function Send-Response {
    param(
        [Parameter(Mandatory = $true)]
        [System.Net.Sockets.NetworkStream]$Stream,

        [Parameter(Mandatory = $true)]
        [int]$StatusCode,

        [Parameter(Mandatory = $true)]
        [string]$ReasonPhrase,

        [Parameter(Mandatory = $true)]
        [byte[]]$Body,

        [Parameter(Mandatory = $true)]
        [string]$ContentType,

        [switch]$HeadOnly
    )

    $headers = @(
        "HTTP/1.1 $StatusCode $ReasonPhrase",
        "Content-Type: $ContentType",
        "Content-Length: $($Body.Length)",
        'Connection: close',
        '',
        ''
    ) -join "`r`n"

    $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($headers)
    $Stream.Write($headerBytes, 0, $headerBytes.Length)

    if (-not $HeadOnly) {
        $Stream.Write($Body, 0, $Body.Length)
    }
}

try {
    $listener.Start()
}
catch {
    Write-Error "Could not start localhost server on port $Port. $($_.Exception.Message)"
    exit 1
}

Write-Host "Serving GymFit PH at http://localhost:$Port/"
Write-Host "Root: $resolvedRoot"

try {
    while ($true) {
        $client = $listener.AcceptTcpClient()
        $stream = $null
        $reader = $null

        try {
            $stream = $client.GetStream()
            $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
            $requestLine = $reader.ReadLine()

            if ([string]::IsNullOrWhiteSpace($requestLine)) {
                continue
            }

            while (($headerLine = $reader.ReadLine()) -ne '') {
                if ($null -eq $headerLine) {
                    break
                }
            }

            $parts = $requestLine.Split(' ')
            if ($parts.Length -lt 2) {
                $body = [System.Text.Encoding]::UTF8.GetBytes('Bad Request')
                Send-Response -Stream $stream -StatusCode 400 -ReasonPhrase 'Bad Request' -Body $body -ContentType 'text/plain; charset=utf-8'
                continue
            }

            $method = $parts[0].ToUpperInvariant()
            $requestTarget = $parts[1]
            $headOnly = $method -eq 'HEAD'

            if ($method -notin @('GET', 'HEAD')) {
                $body = [System.Text.Encoding]::UTF8.GetBytes('Method Not Allowed')
                Send-Response -Stream $stream -StatusCode 405 -ReasonPhrase 'Method Not Allowed' -Body $body -ContentType 'text/plain; charset=utf-8' -HeadOnly:$headOnly
                continue
            }

            $pathOnly = $requestTarget.Split('?')[0]
            $relativePath = [System.Uri]::UnescapeDataString($pathOnly.TrimStart('/'))

            if ([string]::IsNullOrWhiteSpace($relativePath)) {
                $relativePath = 'index.html'
            }

            $relativePath = $relativePath -replace '/', [System.IO.Path]::DirectorySeparatorChar
            $fullPath = [System.IO.Path]::GetFullPath((Join-Path $resolvedRoot $relativePath))

            if (-not $fullPath.StartsWith($resolvedRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
                $body = [System.Text.Encoding]::UTF8.GetBytes('Forbidden')
                Send-Response -Stream $stream -StatusCode 403 -ReasonPhrase 'Forbidden' -Body $body -ContentType 'text/plain; charset=utf-8' -HeadOnly:$headOnly
                continue
            }

            if (Test-Path $fullPath -PathType Container) {
                $fullPath = Join-Path $fullPath 'index.html'
            }

            if (-not (Test-Path $fullPath -PathType Leaf)) {
                $body = [System.Text.Encoding]::UTF8.GetBytes('Not Found')
                Send-Response -Stream $stream -StatusCode 404 -ReasonPhrase 'Not Found' -Body $body -ContentType 'text/plain; charset=utf-8' -HeadOnly:$headOnly
                continue
            }

            $extension = [System.IO.Path]::GetExtension($fullPath).ToLowerInvariant()
            $contentType = $mimeTypes[$extension]

            if (-not $contentType) {
                $contentType = 'application/octet-stream'
            }

            $body = [System.IO.File]::ReadAllBytes($fullPath)
            Send-Response -Stream $stream -StatusCode 200 -ReasonPhrase 'OK' -Body $body -ContentType $contentType -HeadOnly:$headOnly
        }
        catch {
            if ($stream) {
                $body = [System.Text.Encoding]::UTF8.GetBytes('Internal Server Error')
                Send-Response -Stream $stream -StatusCode 500 -ReasonPhrase 'Internal Server Error' -Body $body -ContentType 'text/plain; charset=utf-8'
            }
        }
        finally {
            if ($reader) {
                $reader.Dispose()
            }

            if ($stream) {
                $stream.Dispose()
            }

            $client.Dispose()
        }
    }
}
finally {
    $listener.Stop()
}
