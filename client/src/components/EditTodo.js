import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);

    //edit description function
    const updateDescription = async e => {
        e.preventDefault();
        console.log('Updating description:', description); // Check the value of description

        try {
            const body = { description };
            const response = await fetch(`http://localhost:3000/task/${todo.todo_id}`, 
                {
                    method: "PUT",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify(body)
                }
            );

            window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <button type="button" 
                className="btn btn-warning" 
                data-toggle="modal" 
                data-target={`#id${todo.todo_id}`}
            >
                Edit
            </button>

            {/* id = id8 */}
            <div className="modal" id={`id${todo.todo_id}`}
                onClick={() => setDescription(todo.description)}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Task</h4>
                            <button type="button" className="close" data-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <input type="text" className="form-control" value={description} 
                            onChange={e => setDescription(e.target.value)} />
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-dismiss="modal"
                            onClick={e => updateDescription(e)}
                            >
                                Edit
                            </button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditTodo;