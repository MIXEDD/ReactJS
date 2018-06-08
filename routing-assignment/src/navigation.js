import React from 'react';
import {Link} from 'react-router-dom';

const navigation = () => (
    <div>
        <Link to="/users">Users</Link>
        <Link to="/courses">Courses</Link>
    </div>
);

export default navigation;
