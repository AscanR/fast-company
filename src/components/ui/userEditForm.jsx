import React, {useEffect, useState} from 'react'
import api from "../../api";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import Qualities from "./qualities";

const UserEditForm = ({userId}) => {
    const [user, setUser] = useState()
    const [qualities, setQualities] = useState([])
    const [professions, setProfession] = useState([])
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data))
    }, [])
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = () => {

    }
    const handleSubmit = () => {

    }
    if (user) {
        return (
            <form onSubmit={handleSubmit}>
                <TextField label='Имя' type='text' name='name' value={user.name} onChange={handleChange}/>
                <TextField label='Электронная почта' type='email' name='email' value={user.email}
                           onChange={handleChange}/>
                <SelectField
                    label='Профессия'
                    options={professions}
                    onChange={handleChange}
                    value={user.profession.name}
                    name='profession'
                    defaultOption={user.profession.name}
                />
                <RadioField
                    options={[
                        {name: 'Male', value: 'male'},
                        {name: 'Female', value: 'female'},
                        {name: 'Other', value: 'other'}
                    ]}
                    value={user.sex}
                    name='sex'
                    onChange={handleChange}
                    label='Пол'
                />
                <MultiSelectField
                    options={qualities}
                    onChange={handleChange}
                    name='qualities'
                    label='Качества'
                    value={<Qualities qualities={user.qualities}/>}
                    defaultValue={<Qualities qualities={user.qualities}/>}
                />
                <button type='submit' className='btn btn-primary w-100 mx-auto'>Обновить</button>
            </form>
        )
    }
}

export default UserEditForm