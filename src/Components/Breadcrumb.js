import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from 'semantic-ui-react';

const BreadcrumbDetail = () => (
    <Breadcrumb size='large'>
        <Breadcrumb.Section>
            <Link to="/">
                Home
            </Link>
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon='right angle' />
        <Breadcrumb.Section active>Detail</Breadcrumb.Section>
    </Breadcrumb>
)

export default BreadcrumbDetail