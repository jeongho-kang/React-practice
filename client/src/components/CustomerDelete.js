import React from 'react';

class CustomerDelete extends React.Component {
    deleteCustomer(id) {
        const url='/api/customers/' +id;
        fetch(url,{
            method: 'DELETE'
        });
        // 삭제 후 새롭게 바뀐 고객화면을 다시 화면에 출력
        this.props.stateRefresh();
    }

    render() {
        return(
            <button onClick = {(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }

}

export default CustomerDelete;