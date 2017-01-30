import React from "react";
import { Link } from "react-router"
import { Layout, Navigation, Header, Drawer, Content } from "react-mdl";
import { DataTable, TableHeader } from "react-mdl"
import { connect } from "react-redux";
import { uploadFile } from "../actions/uploadActions"
import axios from "axios";
import $ from "jquery";
var Dropzone = require('react-dropzone');
var request = require('superagent');

@connect((store) => {
    return {
        LNK: store.upload
    };
})

export default class MainLayout extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data_uri: null,
            processing: false,
            rows: []
        };
    }

    componentWillMount(){
        window._this = this;
    }
    handleSubmit(e) {
        e.preventDefault();
        const _this = this;
        this.setState({
            processing: true
        });
        $.ajax({
            url: '/upload/put',
            data: {
                data_uri: this.state.data_uri,
                filename: this.state.filename,
                filetype: this.state.filetype
            },
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    uploadfile (e){
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onload = (upload) => {
            this.setState({
                data_uri: upload.target.result,
                filename: file.name,
                filetype: file.type
            });
        };

        reader.readAsDataURL(file);
    }
    convertToBase64 (file) {
        const reader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
        }
        return new Promise((resolve, reject) => {
            reader.onload = () =>{
                resolve(file);
            };
            reader.onerror = () => {
              return reject(this);
            };
        });
    }


    onDrop (acceptedFiles, rejectedFiles) {
        var data = new FormData();
        data.append('foo', 'bar');
        const reader = new FileReader();
        reader.onload = () =>{
            const base64Data = reader.result;
            _this.props.dispatch(uploadFile({'base64': base64Data}));
        };
        reader.readAsDataURL(acceptedFiles[0]);
    }
    render(){
        const { LNK } = this.props;
        function LNKProperties(){
            if (LNK.LNKProps.length <= 0) {

                return []
            } else {
                var props = [];
                _.map(LNK.LNKProps[0], function (value, prop) {
                    props.push({"prop": prop, "value": value});
                })
                return props;
            }

        }
        const displayDrop = (LNK.LNKProps.length > 0)?'drop-zone none':'drop-zone block';
        const displayProps = (LNK.LNKProps.length <= 0)?'lnk_props none':'lnk_props block';

        return (
            <div>
                <Layout fixedHeader>
                    <Header title={<span><strong>LNK Parser</strong></span>}>
                    </Header>
                    <Content>
                        <Dropzone onDrop={this.onDrop} multiple={false} className={displayDrop}>
                            <div>
                                <h5>Drop you LNK file here, or click to select file to upload.</h5>
                            </div>
                        </Dropzone>
                        <div className={displayProps}>
                        <DataTable
                            shadow={0}
                            rows={LNKProperties()}
                            className=""

                        >
                            <TableHeader name="prop" tooltip="The amazing material name">Prop</TableHeader>
                            <TableHeader numeric name="value" tooltip="Number of materials">Value</TableHeader>
                        </DataTable>
                        </div>
                        {/*{this.props.children}*/}
                    </Content>
                </Layout>
            </div>
        )
    }
}
