import React from "react";
import { Link } from "react-router"
import { Layout, Navigation, Header, Content, Footer, FooterSection, FooterLinkList,
         Dialog, DialogTitle, DialogContent, DialogActions, Button, FABButton,
         Icon } from "react-mdl";
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
            rows: [],
            inArea: false,
            areaStatus: ""
        };
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    componentWillMount(){
        window._this = this;
    }

    handleOpenDialog() {
      this.setState({
        openDialog: true
      });
    }

    handleCloseDialog() {
      this.setState({
        openDialog: false
      });
    }

    refresh() {
        const { LNK } = _this.props;
        LNK.LNKProps = [];
        _this.forceUpdate();
    }

    onDrop (acceptedFiles, rejectedFiles) {
        if(acceptedFiles[0].size > 1000000) {
            _this.state.errorTitle = "File size too large";
            _this.state.errorContent = "Files larger than 1MB are not allowed at this moment";
            _this.handleOpenDialog();
            return;
        }
        if(acceptedFiles[0].type === "application/x-ms-shortcut" || acceptedFiles[0].type === "") {
            const reader = new FileReader();
            reader.onload = () =>{
                const base64Data = reader.result;
                _this.props.dispatch(uploadFile({'base64': base64Data}));
            };
            reader.readAsDataURL(acceptedFiles[0]);
        } else {
            _this.state.errorTitle = "Invalid filetype";
            _this.state.errorContent = "Only LNK files are allowed at this moment";
            _this.handleOpenDialog();
        }
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
                                <TableHeader name="prop" tooltip="Property">Prop</TableHeader>
                                <TableHeader name="value" tooltip="Value">Value</TableHeader>
                            </DataTable>
                        </div>

                    </Content>
                    <Footer size="mini">
                        <FooterSection type="left" logo="Lnk Parser">
                            <FooterLinkList>
                                <a href="#">Help</a>
                                <a href="#">Privacy & Terms</a>
                            </FooterLinkList>
                        </FooterSection>
                    </Footer>
                    <Dialog open={this.state.openDialog}>
                      <DialogTitle>{this.state.errorTitle}</DialogTitle>
                      <DialogContent>
                        <p>{this.state.errorContent}</p>
                      </DialogContent>
                      <DialogActions>
                        <Button type='button' onClick={this.handleCloseDialog} raised colored>OK</Button>
                      </DialogActions>
                    </Dialog>
                    <FABButton colored ripple className="refresh" onClick={this.refresh}>
                        <Icon name="refresh" />
                    </FABButton>
                </Layout>
            </div>
        )
    }
}
