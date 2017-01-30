import React from "react";
import { Link } from "react-router"
import { Layout, Navigation, Header, Drawer, Content } from "react-mdl";
import { connect } from "react-redux";
import { fetchSample } from "../actions/sampleActions"

@connect((store) => {
    return {
        users: store.sample
    };
})
export default class MainLayout extends React.Component{
    componentWillMount(){
        // this.props.dispatch(fetchSample());
    }
    render(){
        return (
            <div>
                <Layout fixedHeader>
                    <Header title={<span><span style={{ color: '#ddd' }}>Area / </span><strong>The Title</strong></span>}>
                        <Navigation>
                            <a href="">Link</a>
                            <a href="">Link</a>
                            <a href="">Link</a>
                        </Navigation>
                    </Header>
                    <Drawer title="Title">
                        <Navigation>
                            <a href="">Link</a>
                            <a href="">Link</a>
                            <a href="">Link</a>
                        </Navigation>
                    </Drawer>
                    <Content>
                        {this.props.children}
                    </Content>
                </Layout>
            </div>
        )
    }
}