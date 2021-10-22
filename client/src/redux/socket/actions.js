const { io } = require('socket.io-client')
const { SOCKET_REQUEST,
    SOCKET_SUCCESS,
    SOCKET_FAILURE } = require('./actions')



export const setupSocket = () => {
    const token = localStorage.getItem("token");

    return dispatch => {
        if (token) {
            const newSocket = io("http://localhost:5000", {
                query: {
                    token: localStorage.getItem("token"),
                },
            });
            dispatch(connect(newSocket))
            newSocket.on("disconnect", () => {
                setTimeout(setupSocket, 3000);
            });
        } else {
            dispatch(failure('the socket must token to continue, please login to continue'))
        }
    }
};

export const connect = socket => {
    return {
        type: SOCKET_SUCCESS,
        payload: socket
    }
}
export const failure = err => {
    return {
        type: SOCKET_SUCCESS,
        payload: err
    }
}