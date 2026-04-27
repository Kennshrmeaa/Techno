class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def display_info(self):
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")


class Student(Person):
    def __init__(self, name, age, course):
        super().__init__(name, age)
        self.course = course

    def display_student(self):
        self.display_info()
        print(f"Course: {self.course}")
        print()  


class Teacher(Person):
    def __init__(self, name, age, subject):
        super().__init__(name, age)
        self.subject = subject

    def display_teacher(self):
        self.display_info()
        print(f"Subject: {self.subject}")
        print()



s1 = Student("kevin", 19, "BSIT")
t1 = Teacher("Mr. thomas", 40, "CC3")


s1.display_student()
t1.display_teacher()


