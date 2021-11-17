'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('Users', [
        {
          title: "mr",
          firstName: "Valentin",
          lastName: "Ortega",
          picture: "https://randomuser.me/api/portraits/med/men/3.jpg",
          gender: "male",
          email: "valentin.ortega@example.com",
          dateOfBirth: "1953-10-15T02:26:17.794Z",
          phone: "993-465-335",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
            title: "mr",
            firstName: "Valentin2",
            lastName: "Ortega2",
            picture: "https://randomuser.me/api/portraits/med/men/3.jpg",
            gender: "male",
            email: "valentin.ortega@example.com",
            dateOfBirth: "1953-10-15T02:26:17.794Z",
            phone: "993-465-335",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: "mr",
            firstName: "Valentin3",
            lastName: "Ortega3",
            picture: "https://randomuser.me/api/portraits/med/men/3.jpg",
            gender: "male",
            email: "valentin.ortega@example.com",
            dateOfBirth: "1953-10-15T02:26:17.794Z",
            phone: "993-465-335",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: "mr",
            firstName: "Valentin4",
            lastName: "Ortega4",
            picture: "https://randomuser.me/api/portraits/med/men/3.jpg",
            gender: "male",
            email: "valentin.ortega@example.com",
            dateOfBirth: "1953-10-15T02:26:17.794Z",
            phone: "993-465-335",
            createdAt: new Date(),
            updatedAt: new Date()
        }
        ], {});

    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
