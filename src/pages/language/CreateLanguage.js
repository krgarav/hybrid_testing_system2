import React, { useEffect, useState } from "react"

import {
    Card,
    CardBody,
    Col,
    Row,
    CardTitle,
    FormGroup,
    Form,
    Label
} from "reactstrap"

import Select from "react-select"

import { connect } from "react-redux";
import { useDispatch } from 'react-redux';

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import { addLanguage, setSuccessFalseLanguage } from "store/language/action";
import { useSelector } from "react-redux";


const CreateLanguage = (props) => {
    document.title = "Question Bank | Create Language";



    const breadcrumbItems = [
        { title: "Language", link: "#" },
        { title: "Create Language", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Create Language', breadcrumbItems)
    })

    const [languageName, setLanguageName] = useState("");
    const [spanDisplay, setSpanDisplay] = useState("none");
    const dispatch = useDispatch();
    const result = useSelector(state => state.languagesReducer)





    const handleSubmit = (e) => {
        e.preventDefault();
        if (!languageName) {
            setSpanDisplay("inline")

        }
        else {
            dispatch(addLanguage({ languageName }));
        }

    };

    useEffect(() => {
        if (result.success == true) {
            setLanguageName("");
            dispatch(setSuccessFalseLanguage());
        }
    }, [result.success]);




    const checkResult = () => {

    }

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <CardBody style={{ width: "60%", }}>
                            <CardTitle className="h4">Create Language</CardTitle>
                            <form onSubmit={handleSubmit}>


                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Language Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter new Language"
                                            value={languageName}
                                            onChange={(e) => setLanguageName(e.target.value)} />
                                        {!languageName && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>



                                <Row className="mb-3">
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary w-md">Submit</button>
                                    </div>
                                </Row>
                            </form>

                        </CardBody>
                    </Card>
                </Col>
            </Row>



        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(CreateLanguage);