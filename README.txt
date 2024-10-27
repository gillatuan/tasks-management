# Write your query or mutation here

mutation CreateLesson {
  createLesson(createLessonInput: {
    name: "test Name 2"
    startDate: "2024-10-25T14:06:36.770Z"
    endDate: "2024-10-28T14:06:36.770Z"
  }) {
    id
    name
  }
}

query listUser {
  lessons {
    id
    name
    startDate
    endDate
  }
}

query detailLesson {
  lesson(id: "180d15a0-d058-4a57-9e59-872700c436f1") {
    id
    name
    endDate
  }
}