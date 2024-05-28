import { useSearch } from "../hooks/useSearch"
import { useState } from 'react'
import styles from "../styles/Search.module.css"
import { Nav } from 'react-bootstrap'

// Search for users
const Search = ({text}) => {
    const {users, loading, error} = useSearch(text)

    if (!users || users.length === 0) {
        return 
    }

    return (
        <div className={styles.searchContainer}> 
        {users.map((user) => (
            <SearchResultRow user={user} key={user._id} />
            ))}
        </div>
    )
}

const SearchResultRow = ({user}) => {
    return (
        <Nav.Link href={`/profile/${user._id}`}>
            <img src={user.profilePictureUrl} alt="Profile picture"></img>
            <h5>{user.firstName} {user.lastName}</h5>
        </Nav.Link>
    )
}

export default Search