import React , { Component } from 'react';
import Expo from 'expo';
import { View } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text } from 'native-base';
import { Field,reduxForm } from 'redux-form';

const validate = values => {
  const error= {};
  error.email= '';
  error.name= '';
  var ema = values.email;
  var nm = values.name;
  if(values.email === undefined){
    ema = '';
  }
  if(values.name === undefined){
    nm = '';
  }
  if(ema.length < 8 && ema !== ''){
    error.email= 'too short';
  }
  if(!ema.includes('@') && ema !== ''){
    error.email= '@ not included';
  }
  if(nm.length > 8){
    error.name= 'max 8 characters';
  }
  if(nm.replace(/^\s+|\s+$/gm,'').length == 0){
    error.name= 'cannot be empty';
  }
  return error;
};

class SimpleForm extends Component {
  constructor(props){
    super(props);
    this.state={
      isReady: false
    };
  }

  async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({isReady: true});
    }

  renderInput = ({ input, label, type, meta: { touched, error, warning } })=>{
    var hasError= false;
    if(error !== undefined){
      hasError= true;
    }
    return(
      <Item error= {hasError}>
        <Input {...input}/>
        {hasError ? <Text>{error}</Text> : <Text />}
      </Item>
    )
  }

  render(){
    const { handleSubmit, reset } = this.props;
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <Header>
          <Body>
            <Title>Redux Form</Title>
          </Body>
        </Header>
        <Content padder>
          <Field name="email" component={this.renderInput} />
          <Field name="name" component={this.renderInput} />
          <Button block primary onPress={handleSubmit}>
            <Text>Submit</Text>
          </Button>
          <Button block primary onPress={reset}>
            <Text>Reset</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default reduxForm({
  form: 'test',
  validate
})(SimpleForm)
