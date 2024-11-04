const StatusFields = ({ statusFields, setStatusFields }) => {

    const handleAddField = () => {
        setStatusFields([...statusFields, {name: ''}]);
    };

    const handleRemoveField = (index) => {
        const updateFields = statusFields.filter((_, i) => i !== index);
        setStatusFields(updateFields);
    };

    const handleFieldChange = (index, value) => {
        const updateFields = [...statusFields];
        updateFields[index].name = value;
        setStatusFields(updateFields);
    }

    return (
        <div>
            <h2 className="mb-3 mt-2 fw-4" >Add status columns for the board</h2>
            {statusFields.map((field, index) => (
                <div key={index} className='form-row mb-3'>
                    <div className="d-flex justify-content-between align-items-center">
                        <label className="me-2" htmlFor={`statusField-${index}`}> 
                            Column name 
                        </label>
                        <button type='button' className='btn-close me-2 mt-2'
                            onClick={() => handleRemoveField(index)}
                            disabled={statusFields.length <= 1}
                        >
                    </button>
                    </div>
                    <input className="form-control"
                        value={field.name}
                        placeholder={`Column ${index + 1}`}
                        onChange={e => handleFieldChange(index, e.target.value)}
                        type='text'
                        required
                    />
                </div>
            ))}
            <button type='button' className='btn btn-primary mt-2'
                onClick={handleAddField} >
                 Add new
            </button>
        </div>
    );
};

export default StatusFields;