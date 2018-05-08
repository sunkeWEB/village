import React, {Component} from 'react';
import {Modal, Button} from 'antd';

class Modals extends Component {
    constructor(props) {
        super(props);
    }

    handleOk = (e) => {
        this.props.handlesubmit();
    }
    handleCancel = (e) => {
        this.props.handlecancel();
    }

    render() {
        const props = this.props;
        return (
            <div>
                <Modal
                    title={props.title ? props.title : "提示"}
                    visible={this.props.showmodal}
                    onOk={this.handleOk}
                    onCancel={()=>this.handleCancel()}
                    cancelText={props.canltext ? props.canltext : "取消"}
                    okText={props.oktext ? props.oktext : "确定"}
                >
                    {props.children}
                </Modal>
            </div>
        )
    }
}

export default Modals;