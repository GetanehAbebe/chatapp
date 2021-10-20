import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../redux/contacts/actions'
const Contacts = () => {
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.contacts)
    useEffect(() => {
        if (!users.length) dispatch(fetchUsers())
    }, [])
    return <>
        {
            users && users.map((user, i) => {
                return <li key={i} > {user.name} </li>
            })
        }
    </>

}
export default Contacts