import React from 'react';
import {useState} from "react";

function DataInput() {
    const [fieldList, setFieldList] = useState([{ firstName: "", lastName: "" }]);

    return (
        <div className="DataInput">
            <h1>Department Data Input</h1>
            {/*<form onSubmit={handleSubmit}>*/}
            <form>
                <fieldset>
                    <label>
                        <p>Name</p>
                        <input name="name" />
                    </label>
                </fieldset>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default DataInput;