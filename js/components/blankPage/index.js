
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ListView, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, Item, List, ListItem, Label  } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

var URL="http://mhs.rey1024.com/1415051095/tugasSendData/view.php";

class BlankPage extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds,
    };
  }

  AmbilData() {
    fetch(URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows
        (responseData),
      });
    }) .done();
  }

  renderRow(record) {
    return (
      <ListItem>
        <Body>
          <Text>{record.nama}</Text>
          <Text>{record.alamat}</Text>
        </Body>
      </ListItem>
    );
  }

  render() {
    this.AmbilData();
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>{(this.props.name) ? this.props.name : 'List Data'}</Title>
          </Body>

        </Header>

        <Content>
          <List>
            <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    />
          </List>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(BlankPage);
