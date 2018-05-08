import React, {Component} from 'react';
import {Upload, Icon, message } from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/png';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}
@withRouter
@connect(state=>state, {})
class UploadImg extends React.Component {
    state = {
        loading: false,
    };
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
            this.props.uploadSuccess(info.fileList[0].response.filename);
        }
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">{this.props.uploadText}</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <Upload
                name="logo"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/upload"
                headers={{authorization:this.props.user.token}}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img style={{height:100,width:100}} src={imageUrl} alt="" /> : uploadButton}
            </Upload>
        );
    }
}

export default UploadImg;