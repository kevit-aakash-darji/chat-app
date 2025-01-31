/* eslint-disable no-param-reassign */
const users = []

// add user
export const addUser = ({ id, username, room }) => {
    // clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // validate the data
    if (!username || !room) {
        return { error: 'Username and room are required' }
    }

    // check for existing user
    const existingUser = users.find((user) => (user.username === username && user.room === room))

    // validate username
    if (existingUser) {
        return {
            error: "Username is in use!"
        }
    }

    // store user
    const user = { id, username, room }
    users.push(user)
    return { user }
}

// remove user
export const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
    return undefined
}

// get user
export const getUser = (id) =>
    users.find((x) => x.id === id)

// get users in room
export const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((x) => x.room === room)
}
// get all rooms nam
export const getAllRoomsName = () => {
    return users.reduce((rooms, user) => {
        if (user?.room && !rooms.includes(user.room)) {
            rooms.push(user.room)
            return rooms
        }
    }, [])
}

export const updateTypingValue = (id, isTyping) => {
    const index = users.findIndex((user) => user.id === id)
    if (index >= 0) {
        users[index]['isTyping'] = isTyping
    }
    return users.filter((user) => user.room === users[index].room && user?.isTyping)
}
