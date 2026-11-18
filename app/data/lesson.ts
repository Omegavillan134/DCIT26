export interface Lesson {
  id: string;
  lesson: string;
  name: string;
  description: string;
  pdf?: string;              // "/media/lessons/1/lesson-1.pdf" (leading slash)
  text?: string[];
  defaultView?: "slides" | "text";
}

export const lessons: Lesson[] = [
  {
    id: "1",
    lesson: "Lesson 1",
    name: "Glimpse at Emerging Technologies",
    description: "This lesson provides an overview of emerging technologies and their impact on various industries.",
    defaultView: "slides",
    pdf: "/media/lessons/1/DCIT26_Lesson1.pdf",
    text: ["First paragraph of the text version...", "Second paragraph..."],
  },
  {
    id: "2",
    lesson: "Lesson 2",
    name: "Introduction To C++ Programming",
    description: "This lesson introduces the fundamentals of C++ programming and its applications.",
    defaultView: "slides",
    pdf: "/media/lessons/2/DCIT26_Lesson2.pdf",
    text: ["(Lesson 2 text goes here.)"],
  },
  {
    id: "3",
    lesson: "Lesson 3",
    name: "C++ Basics",
    description: "This lesson covers the basic concepts and syntax of C++ programming.",
    defaultView: "slides",
    pdf: "/media/lessons/3/DCIT26_Lesson3.pdf",
    text: ["(Lesson 3 text goes here.)"],
  },
];