import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap'

export class Modalform extends Component {
    render() {
        return (
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.hide}
                    backdrop="static"

                >
                    <Modal.Header closeButton>
                        <Modal.Title>fruits update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <Form onSubmit={this.props.update}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Fruits name</Form.Label>
                                <Form.Control type="text" defaultValue={this.props.item.name} name='name'/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>fruits image</Form.Label>
                                <Form.Control type='text' defaultValue={this.props.item.image} name='image' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>fruits price</Form.Label>
                                <Form.Control type='text' defaultValue={this.props.item.price} name='price' />
                            </Form.Group>
                            <Button variant="secondary" onClick={this.props.hide}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit'>Save change</Button>

                        </Form>

                        




                    </Modal.Body>



                </Modal>
            </div>
        )
    }
}

export default Modalform
