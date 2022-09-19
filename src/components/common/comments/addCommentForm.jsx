import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";

const defaultData = { userId: "", content: "" };
const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(defaultData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        userId: {
            isRequired: { message: "Выбирете от чьего имени Вы хотите направить сообщение" }
        },
        content: {
            isRequired: { message: "Сообщение не может быть пустым" }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors) === null;
    };
    const isValid = Object.keys(errors).length === 0;
    useEffect(() => {
        validate();
    }, [data]);
    useEffect(() => {
        api.users.fetchAll().then(setUsers);
    }, []);
    const clearForm = () => {
        setData(defaultData);
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    const arrayOfUsers = users && Object.keys(users).map(userId => ({
        label: users[userId].name,
        value: users[userId]._id
    }));
    return (
        <div>
            <h2>Новый комментарий</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    onChange={handleChange}
                    options={arrayOfUsers}
                    name="userId"
                    defaultOption="Выбирете пользователя"
                    error={errors.userId}
                />
                <TextAreaField
                    value={data.content}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button disabled={!isValid} className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
