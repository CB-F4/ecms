import { connect } from 'dva';
import React from 'react';
import DocumentTitle from 'react-document-title';
import { formatMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { MenuDataItem, getPageTitle, getMenuData, DefaultFooter } from '@ant-design/pro-layout';
import logo from '../assets/logo.svg';
import styles from './LoginLayout.less';
import { ConnectProps, ConnectState } from '@/models/connect';
import SelectLang from '@/components/SelectLang';

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
}

const LoginLayout: React.SFC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes, props);

  const links = [
    {
      key: 'ECMS',
      title: 'ECMS',
      href: 'https://github.com/CB-F4/ecms.git',
      blankTarget: true,
    },
    {
      key: 'Document',
      title: '帮助文档',
      href: 'https://github.com/CB-F4/ecms.git',
      blankTarget: true,
    },
    {
      key: 'Github',
      title: '问题反馈',
      href: 'https://github.com/CB-F4/ecms.git',
      blankTarget: true,
    },
  ];

  const copyright = '2019 niuzz';

  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        ...props,
      })}
    >
      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>ECMS</span>
              </Link>
            </div>
            <div className={styles.desc}>
              <p>less is more, slow is fast</p>
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter links={links} copyright={copyright} />
      </div>
    </DocumentTitle>
  );
};

export default connect(({ settings }: ConnectState) => ({
  ...settings,
}))(LoginLayout);
