import React, { useEffect, useState } from "react";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import BackButton from "../../common/backButton";

const UserEditPage = ({ userId }) => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then((data) => setUser((prevState) => ({
            ...prevState,
            ...data,
            qualities: data.qualities.map((quality) => ({ label: quality.name, value: quality._id })),
            profession: data.profession._id
        })));
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

    useEffect(() => {
        if (user._id) {
            setIsLoading(false);
        }
    }, [user]);

    const handleChange = (target) => {
        setUser((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const validatorConfig = {
        email: {
            isRequired: { message: "Электронная почта обязательна для заполнения" },
            isEmail: { message: "Электронная почта введена некорректно" }
        },
        name: {
            isRequired: { message: "Необходимо ввести имя" }
        }
    };

    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors) === null;
    };

    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        api.users.update(userId, {
            ...user, profession: getProfessionById(user.profession), qualities: getQualities(user.qualities)
        }).then((data) => history.push("/users"));
    };
    if (!isLoading) {
        return (
            <div className="container mt-5">
                <BackButton/>
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit} className='m-2'>
                            <TextField label='Имя' type='text' name='name' value={user.name} onChange={handleChange}
                                       error={errors.name}/>
                            <TextField label='Электронная почта' type='email' name='email' value={user.email}
                                       onChange={handleChange} error={errors.email}/>
                            <SelectField
                                label='Профессия'
                                options={professions}
                                onChange={handleChange}
                                value={user.profession}
                                name='profession'
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
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
                                defaultValue={user.qualities}
                            />
                            <button type='submit' disabled={!isValid} className='btn btn-primary w-100 mx-auto'>Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h3 className='m-2'>Loading...</h3>;
    }
};

UserEditPage.propTypes = {
    userId: PropTypes.string
};

export default UserEditPage;
