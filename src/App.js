import React, { useState, useEffect } from 'react';
import './App.css';
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
function App() {
  const [countryName, setCountryName] = useState('');
  const [covidDetails, setCovidDetails] = useState({ totalCases: 0, deaths: 0, recovered: 0 })
  const onSubmit = () => {
    const api = `https://covid19.mathdro.id/api/countries/${countryName}`;
    axios.get(api).then((res) => {
      setCovidDetails({
        totalCases: numberFormat(res.data.confirmed.value),
        deaths: numberFormat(res.data.deaths.value),
        recovered: numberFormat(res.data.recovered.value)
      })
      console.log("Responseeee", res.data);
    }).catch((err) => {
      toast.error(err.response.data.error.message, {
        position: "top-right",
        autoClose: 5000
      })
    })
  }
  let numberFormat = (value) => {
    var val = Math.abs(value)
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(2) + ' cr';
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(2) + ' L';
    } else if (val >= 1000) {
      val = (val / 1000).toFixed(2) + ' K'
    } else {
      val = val.toFixed(2)
    }
    return val;
  }
  return (
    <>
      <Row className='container-fluid'>
        <Col lg="2"></Col>
        <Col lg="8">
          <Form inline autoComplete='off'>
            <FormGroup>
              <Label
                for="exampleEmail"
              >
                Enter Country name to get the live update about covid-19 cases
              </Label>
              <Input
                name="country"
                placeholder="Country name"
                type="text"
                onChange={(e) => {
                  setCountryName(e.target.value);
                }}
              />
            </FormGroup>

            <Button color="primary" onClick={() => { onSubmit(); setCountryName('') }}>
              Search
            </Button>
          </Form>
        </Col>
        <Col lg="2"></Col>
      </Row>
      <Row className='container-fluid mt-3'>
        <Col lg="2"></Col>
        <Col lg="8">
          <p>Total Cases :- {covidDetails.totalCases}</p>
          <p>Total Recovered :- {covidDetails.recovered}</p>
          <p>Total Deaths :- {covidDetails.deaths}</p>
        </Col>
        <Col lg="2"></Col>
      </Row>
    </>
  );
}

export default App;
