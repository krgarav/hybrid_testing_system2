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
// import { addClass, updateClass } from './actions';

//Import Action to copy breadcrumb items from local state to redux state
import { fetchSection, setBreadcrumbItems } from "../../store/actions";
import { addClass, fetchClass } from "store/class/action";
import { useSelector } from "react-redux";
import classesReducer from '../../store/class/reducer';
import { addSubSection, setSuccessFalseSubSection } from "store/subSection/action";


const CreateSubSection = (props) => {
    document.title = "Question Bank | Create SubSection";



    const breadcrumbItems = [
        { title: "SubSection", link: "#" },
        { title: "Create SubSection", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Create SubSection', breadcrumbItems)
    })

    const [toggleSwitch, settoggleSwitch] = useState(true)
    const [toggleSwitchSize, settoggleSwitchSize] = useState(true)
    const [section, setSection] = useState(null);
    const [selectedClasss, setSelectedClasss] = useState(null);
    const [subSectionName, setSubSectionName] = useState("");
    const [subSectionDescription, setSubSectionDescription] = useState("");
    const [subSectionCode, setSubSectionCode] = useState("");
    const [spanDisplay, setSpanDisplay] = useState("none");
    const dispatch = useDispatch();
    const sections = useSelector(state => state.sectionsReducer)
    const result = useSelector(state => state.subSectionsReducer)

    useEffect(() => {           /* For closing the sidebar if opened */
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])

    useEffect(() => {
        if (sections?.sections.length == 0) {
            dispatch(fetchSection());
        }
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        let sectionId = section?.id;
        if (!subSectionName || !subSectionDescription || !subSectionCode || !sectionId) {
            setSpanDisplay("inline")

        }
        else {
            dispatch(addSubSection({ subSectionName, subSectionDescription, subSectionCode, sectionId }));
        }

    };

    useEffect(() => {
        if (result.success == true) {
            setSubSectionCode("");
            setSubSectionName("");
            setSection(null);
            setSubSectionDescription("");
            dispatch(setSuccessFalseSubSection());
        }
    }, [result.success]);


    const handleSelectSection = selectedOption => {
        setSection(selectedOption);
        console.log(selectedOption);
    };


    const checkResult = () => {

    }

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <CardBody className="col-xl-6 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                            <CardTitle className="h4">Create SubSection</CardTitle>
                            <form onSubmit={handleSubmit}>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Section Name
                                    </label>
                                    <div className="col-md-10">
                                        <Select

                                            value={section}
                                            onChange={handleSelectSection}
                                            options={sections?.sections?.result}
                                            getOptionLabel={option => option.sectionName + " (" + option.sectionCode + ")"}
                                            getOptionValue={option => option.id.toString()} // Convert to string if classId is a number
                                            classNamePrefix="select2-selection"
                                        />
                                        {!section && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>

                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        SubSection Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter new SubSection"
                                            value={subSectionName}
                                            onChange={(e) => setSubSectionName(e.target.value)} />
                                        {!subSectionName && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        SubSection Description
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter New Description"
                                            value={subSectionDescription}
                                            onChange={(e) => setSubSectionDescription(e.target.value)} />
                                        {!subSectionDescription && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        SubSection Code
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter SubSection Code"
                                            value={subSectionCode}
                                            onChange={(e) => setSubSectionCode(e.target.value)} />
                                        {!subSectionCode && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
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

export default connect(null, { setBreadcrumbItems })(CreateSubSection);