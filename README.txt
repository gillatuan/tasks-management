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

=======================
User

mutation {
  register(registerInput: {
    email: "tuan5@gmail.com",
    password: "123456",
    phone: "0977757900",
    address: "123 Le Loi F3 Q.1",
    image:"erhrehrh"
  }) {
    id
    email
    phone
  }
}Ø

query ListUsers {
  findAll {
    id
   	email
    phone
  }
}

query getUser {
  findOne(id: "d9bdfde0-3137-4535-9ff9-d91aacb5cb14") {
    email
    phone
    address
    image
  }
}

mutation RemoveUser {
  removeUser(id: "9b926aef-2628-4fbf-a605-93ff409d7f5d") 
}

query SearchTerms {
  searchTerms(filterDto: {
    s: ""
  }) {
    id
    email
  }
}

mutation UpdateUser {
  updateUser(id: "678c24aa-fcb3-429d-a479-ffe5c1fecce4", updateUserInput: {
    id: "678c24aa-fcb3-429d-a479-ffe5c1fecce4"
    email: "tuan2@gmail.com",
    phone: "0977757911",
    address: "123 Le Loi F3 Q.1",
    image:"erhrehrh"
  }) 
}

query FindByEmail {
  findByEmail(email: "tuan1@gmail.com") {
    id
    phone
    address
    image
  }
}

mutation Login {
  login(loginInput: {email: "tuan1@gmail.com", password: "123456"}) {
    accessToken
  }
}
