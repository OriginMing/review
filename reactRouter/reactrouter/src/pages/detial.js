import React from 'react'

export default function detial(props) {
    console.log(props)
    return (
        <div>
            ID:{props.match.params.id}
        </div>
    )
}
