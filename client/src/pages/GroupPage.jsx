import React, { useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown';
import Card from '../components/UIElemets/Card'
import { useHistory } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { addConversation } from '../DAL/index'
import { fetchUsers } from '../redux/contacts/actions'
export default function GroupPage() {
    const dispatch = useDispatch()
    const [selectedValues, setSelectedValues] = useState(true)
    const [name, setName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const history = useHistory()
    const userId = localStorage.getItem('userId')
    const userName = localStorage.getItem('userName')
    const { users } = useSelector(state => state.contacts)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await addConversation(name, [...selectedValues, { name: userName, userId }], userId)
        if (!result.message) {
            history.push(`/chatroom`)
        }
    }

    useEffect(() => {
        if (users.length || !users) dispatch(fetchUsers())
    }, []
    )
    const hadleChange = (e) => {
        setName(e.target.value)
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">group Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="sport room"
                        onChange={hadleChange}
                    />
                </div>
                <Multiselect options={users}
                    selectedValue={users}
                    onSelect={(data) => { setSelectedValues(data) }}
                    onRemove={(data) => { setSelectedValues(data) }}
                    displayValue={'name'}
                />
                <button type="submit" >Create</button>
            </form>
        </Card >
    )
}
