import React from 'react'
import { Form ,Col} from 'react-bootstrap'

export default function SearchForm({params,onParamChange}){
    return(
        <Form className="mb-4">
            <Form.Row className="align-items-end">
                <Form.Group as ={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={onParamChange} value={params.description} name="description" type="text"/>
                </Form.Group>
                <Form.Group as ={Col}>
                    <Form.Label>location</Form.Label>
                    <Form.Control onChange={onParamChange} value={params.location} name="location" type="text"/>
                </Form.Group>
                <Form.Group as ={Col} xs="auto" className="ml-2">
                    <Form.Check onChange={onParamChange} 
                    className="mb-2"
                    value={params.full_time} 
                    type="checkbox"
                    label="Only full time"
                    name="full_time" 
                    id="full-time"/>
                </Form.Group>
            </Form.Row>
        </Form>
    )

}