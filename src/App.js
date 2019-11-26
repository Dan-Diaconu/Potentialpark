import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Alert,
  Badge,
  Container,
  Row,
  Col,
  ToastHeader,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import ReactSpeedometer from "react-d3-speedometer";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaExclamationTriangle,
  FaPowerOff,
  FaBatteryEmpty,
  FaBatteryHalf,
  FaBatteryFull
} from "react-icons/fa";
import axios from "axios";
import "./App.css";

const URL_API = "https://www.southpolebit.com/cars/";

const App = props => {
  const [controlActive, setControls] = useState(false);
  const [serverMessage, setMessageServer] = useState('');
  const [carOnOff, setCarOnOffSelected] = useState(0);
  const [bStarTheme, setStartTheme] = useState("danger");
  const [signLeftWriteWarning, setSignalSelected] = useState(0);
  const [carLights, setLights] = useState(0);
  const [carSpeed, setSpeeds] = useState(0);
  const [currentCar, setCurrentCar] = useState({});

  const [iName, setiName] = useState('');
  const [iNo, setiNo] = useState('');
  const [iReg, setiReg] = useState('');
  const [iSpeedometru, setSpeedometru] = useState(2);

  const [allCars, setAllCars] = useState([]);

  useEffect(() => {
    // code to run on component mount
    comboCars();


  }, [])


  const onChangeCars = (e) =>{
    if(e !== 0){
      let filt = allCars.filter(car => car.id === e);
//      console.log(' Valoare ', filt);
      setCurrentCar(filt);
   //   console.log(' Current Car', currentCar);
      setiName(filt[0].name);
      setiNo(filt[0].plateno);
      setSpeedometru(filt[0].speeds)
      setiReg(filt[0].adaugat);
      setCarOnOffSelected(parseInt(filt[0].start));
//      console.log(parseInt(filt[0].start));
      setSpeeds(parseInt(filt[0].speed));
      setLights(parseInt(filt[0].light));
      setSignalSelected(parseInt(filt[0].signals));
      setControls(parseInt(filt[0].start));
      setStartTheme(parseInt(filt[0].start) === 1 ? 'success' : 'danger');
//      console.log('filt[0].signals   ',filt[0].signals)
    }
    else{
      setCurrentCar({});
    }
    setMessageServer('');
  }

  const comboCars = () => {

    let url = URL_API + 'read.php'
    fetch(url)
    .then(response => response.json())
    .then(data => 
      setAllCars(data.records)
     )
    .catch(function(error) {
      console.log("Request failed", error);
    });

    if(currentCar.length !== undefined){
    //  onChangeCars(currentCar.id);
     }
 


  }

  const carStartTheme = (action, theme) => {
    setCarOnOffSelected(action);
    setStartTheme(theme);

    if(currentCar.length === undefined){
     return;
    }

    if (action === 1) {
      setControls(true);

      if(parseInt(currentCar[0].start) === parseInt(carOnOff))
      {
        let data91 = {};
        data91.id = currentCar[0].id.toString();
        data91.expl = 'star';

        let url2 = URL_API+'start.php';
        axios({method: 'post', url: url2, data: data91 })
          .then(function (response) {
              setMessageServer(response.data.message)
              comboCars()
          })
          .catch(function (error) {
             // setMessageServer('danger')
          });
      }
//    console.log('  ID  ', currentCar[0].id);
//    console.log('  ON  ', carOnOff);
 //   console.log('  STARE  ', currentCar[0].start);
  //  console.log('  FAC UPDATE SAU NU  ', parseInt(currentCar[0].start) === parseInt(carOnOff));
    } else {
 //    console.log('  ID  ', currentCar[0].id);
 //    console.log('  OFF', carOnOff);
 //    console.log('  STARE  ', currentCar[0].start);
 //    console.log('  FAC UPDATE SAU NU  ', parseInt(currentCar[0].start) === parseInt(carOnOff));
        if(parseInt(currentCar[0].start) === parseInt(carOnOff))
        {
          let data911 = {};
          data911.id = currentCar[0].id.toString();
          data911.expl = "stop";
          let url1 = URL_API+'stop.php';
          axios({method: 'post', url: url1, data: data911,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
         })
            .then(function (response) {
                setMessageServer(response.data.message)
                comboCars()
            })
            .catch(function (error) {
                // setMessageServer('danger')
            });
        }

      setControls(false);
      setSignalSelected(0);
      setLights(0);
      setSpeeds(0);
    }
  };


  const setSignalClick = (action) => {
    if(currentCar.length === undefined){
     return;
    }
      if(parseInt(currentCar[0].signals) !== (action))
      {
        let data91 = {};
        data91.id = currentCar[0].id.toString();
        data91.signals = parseInt(action);

        let url2 = URL_API+'signals.php';
        axios({method: 'post', url: url2, data: data91 })
          .then(function (response) {
              setMessageServer(response.data.message)
              comboCars()
          })
          .catch(function (error) {
             // setMessageServer('danger')
          });
      }
      setSignalSelected(action);
  };

  const setLightClick = (action) => {
    if(currentCar.length === undefined){
     return;
    }
      if(parseInt(currentCar[0].signals) !== parseInt(action))
      {
        let data91 = {};
        data91.id = currentCar[0].id.toString();
        data91.light = parseInt(action);

        let url2 = URL_API+'light.php';
        axios({method: 'post', url: url2, data: data91 })
          .then(function (response) {
              setMessageServer(response.data.message)
              comboCars()
          })
          .catch(function (error) {
             // setMessageServer('danger')
          });
      }
      setLights(parseInt(action));
  };

  const setSpeedClick = (action) => {
    if(currentCar.length === undefined){
     return;
    }
      if(parseInt(currentCar[0].speed) !== parseInt(action))
      {
        let data91 = {};
        data91.id = currentCar[0].id.toString();
        data91.speed = parseInt(action);

        let url2 = URL_API+'speed.php';
        axios({method: 'post', url: url2, data: data91 })
          .then(function (response) {
              setMessageServer(response.data.message)
              
          })
          .catch(function (error) {
             // setMessageServer('danger')
          });
      }
      setSpeeds(parseInt(action));
      comboCars();
  };


  const submitForm = (e) => {
    e.preventDefault();

    const name = document.getElementById('name911').value;
    const plateno = document.getElementById('plateno911').value;
    const speeds = document.getElementById('speeds911').value;

    let data911 = {};
    data911.name = name;
    data911.plateno = plateno;
    data911.speeds = speeds;

//    console.log(' >>>>>>>> ', data911);

    let url1 = URL_API+'create.php';

    axios({method: 'post', url: url1, data: data911 })
      .then(function (response) {
          setMessageServer(response.data.message)
          comboCars()
      })
      .catch(function (error) {
         // setMessageServer('danger')
      });
}

  const renderSwitchSignal = param => {
    switch (param) {
      case 1:
        return <FaArrowAltCircleLeft />;
      case 2:
        return <FaArrowAltCircleRight />;
      case 3:
        return <FaExclamationTriangle />;
      default:
        return <FaPowerOff />;
    }
  };

  const renderSwitchLight = param => {
    switch (param) {
      case 1:
        return <FaBatteryHalf />;
      case 2:
        return <FaBatteryFull />;
      default:
        return <FaBatteryEmpty />;
    }
  };

  return (
    <Container>
      <Row>
        <Col md="4">
          <h1>
            <Badge color="info">Dashboard - Potentialpark</Badge>
          </h1>          
        </Col>      
      </Row>

      <Row>
        <Col md="5">
        <Alert color="primary"> Select a car: {' '}
          
        { 
           allCars.map( car => 
          <Button outline key={car.id} value={car.id} color="info" size="sm" onClick={(event)=>onChangeCars(event.target.value)}>{car.plateno}</Button>
           ) 
              }

        </Alert>

          <Alert color="primary">
            <span>
              Engine 
              <ButtonGroup style={{ padding: "0 30px" }}>
                <Button
                  color={bStarTheme}
                  onClick={() => carStartTheme(1, "success")}
                  active={carOnOff === 1}
                >
                  Start 
                </Button>
                <Button
                  color={bStarTheme}
                  onClick={() => carStartTheme(0, "danger")}
                  active={carOnOff === 0}
                >
                  Stop 
                </Button>
              </ButtonGroup>
            </span>
          </Alert>

          {controlActive ? (
            <div>
              <Alert color="primary">
                <span>
                  Signal:
                  <ButtonGroup  style={{ padding: "0 20px" }}>
                    <Button
                      color="primary"
                      onClick={() => setSignalClick(0)}
                      active={signLeftWriteWarning === 0}
                    >
                      Off
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => setSignalClick(1)}
                      active={signLeftWriteWarning === 1}
                    >
                      Left
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => setSignalClick(2)}
                      active={signLeftWriteWarning === 2}
                    >
                      Right
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => setSignalClick(3)}
                      active={signLeftWriteWarning === 3}
                    >
                      Warning
                    </Button>
                  </ButtonGroup>
                </span>
              </Alert>

              <Alert color="primary">
                  <span>Light
                  <ButtonGroup style={{ padding: "0 20px" }}>
                    <Button
                      color="primary"
                      onClick={() => setLightClick(0)}
                      active={carLights === 0}
                    >
                      Off
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => setLightClick(1)}
                      active={carLights === 1}
                    >
                      Short
                    </Button>
                    <Button
                      color="primary"                      
                      onClick={() => setLightClick(2) }
                      active={carLights === 2}
                    >
                      Long
                    </Button>
                  </ButtonGroup>
                  </span>
              </Alert>

              <Alert color="primary">
                  <span>Speed
                  <ButtonGroup style={{ padding: "0 20px" }}>
                    <Button
                      color="primary"
                      onClick={() => setSpeedClick(0)}
                      active={carSpeed === 0}
                    >
                      Off
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => setSpeedClick(1)}
                      active={carSpeed === 1}
                    >
                      1
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => setSpeedClick(2)}
                      active={carSpeed === 2}
                    >
                      2
                    </Button>

                    <Button
                      color="primary"
                      onClick={() => setSpeedClick(3)}
                      active={carSpeed === 3}
                      disabled={iSpeedometru<3}
                    >
                      3
                    </Button>

                    <Button
                      color="primary"
                      onClick={() => setSpeedClick(4)}
                      active={carSpeed === 4}
                      disabled={iSpeedometru<4}
                    >
                      4
                    </Button>

                    <Button
                      color="primary"
                      onClick={() => setSpeedClick(5)}
                      active={carSpeed === 5}
                      disabled={iSpeedometru<5}
                    >
                      5
                    </Button>

                    <Button
                      color="primary"
                      onClick={() => setSpeedClick(6)}
                      active={carSpeed === 6}
                      disabled={iSpeedometru<6}
                    >
                      6
                    </Button>
                  </ButtonGroup>
                  </span>
              </Alert>
            </div>
          ) : (
            <h6>
              <Badge color="secondary">Dashboard Off</Badge>
            </h6>
          )}
        </Col>

        <Col md="auto"></Col>
        <Col md="5">
          <Alert color="warning">
            <div>
              {" "}
              {carOnOff === 0 ? (
                <ToastHeader icon="danger">
                  {" "}
                  Car: STOP
                </ToastHeader>
              ) : (
                <ToastHeader icon="success">
                  Car: START
                </ToastHeader>
              )}{" "}
            </div>

            <div>
              {renderSwitchSignal(signLeftWriteWarning)} Signal
              {/* 
              Signal:{" "}
              {`${signLeftWriteWarning[0].toUpperCase()}${signLeftWriteWarning.slice(
                1
              )}`}
              */}
            </div>
            <div>
              {" "}
              {renderSwitchLight(carLights)} Light
              {/*
              Light:{" "}
              {`${carLights[0].toUpperCase()}${carLights.slice(1)}`}
              */}
            </div>
            <div>
            {/*   Speed: {`${carSpeed[0].toUpperCase()}${carSpeed.slice(1)}`} */}
              <ReactSpeedometer
                minValue={0}
                maxValue={parseInt(iSpeedometru)}
                value={carSpeed}
                width={300}
                height={200}
                forceRender={true}
              />
            </div>

            <div> Name: <b>{iName}</b> </div>
            <div> No: <b>{iNo}</b> </div>
            <div> Register: <b>{iReg}</b> </div>

          </Alert>

          <Badge color="success">Daniel.Diaconu 2019</Badge>
        </Col>
      </Row>

      { serverMessage !== '' ? <Alert color='success'> {serverMessage} </Alert> : ''}


      <Alert color="danger">
        <Form onSubmit={submitForm} id='form11'>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="name" sm={3} size="sm">
              Name/Model
            </Label>
            <Input
              type="text"
              name="name"
              id="name911"
              placeholder="name / model"
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="plateno" sm={3} size="sm">
            Registration plate
            </Label>
            <Input
              type="text"
              name="plateno"
              id="plateno911"
              placeholder="registration plate"
            />
          </FormGroup>

          <FormGroup sm={2} size="sm">
            <Label for="speeds" className="mr-sm-2">
              Speeds
            </Label>
            <Input type="select" name="speeds" id="speeds911">
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </Input>
          </FormGroup>

          <Button>Submit</Button>
        </Form>
      </Alert>
    </Container>
  );
};

export default App;