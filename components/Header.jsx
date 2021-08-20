import React from 'react';
import { Menu } from 'semantic-ui-react';


export const Header = () => {
    return (
        <Menu>
            <Menu.Item>
                Crowd Fund
            </Menu.Item>
            <Menu.Item position="right">
                <Menu.Item>
                    Campaigns
                </Menu.Item>
                <Menu.Item>
                    +
                </Menu.Item>
            </Menu.Item>
        </Menu>
    )
}