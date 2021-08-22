import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export const Header = () => {
    return (
        <Menu>
            <Menu.Item>
                <Link route="/">
                    <a className="item">
                        Crowd Fund
                    </a>
                </Link>
            </Menu.Item>
            <Menu.Item position="right">
                <Link route="/">
                    <a className="item">
                        Campaigns
                    </a>
                </Link>
                <Link route="/campaigns/new">
                    <a className="item">
                        +
                    </a>
                </Link>
            </Menu.Item>
        </Menu>
    )
}