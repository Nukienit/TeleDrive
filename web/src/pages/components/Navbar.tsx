import { DashboardOutlined, LoginOutlined } from '@ant-design/icons'
import { Button, Form, Input, Layout, Menu, Modal, Typography } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

interface Props {
  user?: any,
  page?: string
}


const Navbar: React.FC<Props> = ({ user, page }) => {
  const [wantToLogin, setWantToLogin] = useState<boolean>()
  const history = useHistory()
  const [form] = useForm()

  const saveInvitationCode = () => {
    const { code } = form.getFieldsValue()
    localStorage.setItem('invitationCode', code)
    form.resetFields()
    setWantToLogin(false)
    history.push('/login')
  }

  useEffect(() => {
    if (wantToLogin) {
      form.setFieldsValue({ code: localStorage.getItem('invitationCode') })
    }
  }, [wantToLogin])

  return <>
    <Layout.Header style={{ background: '#0088CC' }}>
      <div key="logo" className="logo" style={{ marginRight: '30px' }}>
        <Link to="/" style={{ color: '#fff' }}>
          <img style={{ width: '24px' }} src="/logo192.png" alt="icon.png" />&nbsp; TeleDrive
        </Link>
      </div>
      {user ?
        <Button onClick={() => history.push('/dashboard')} type="link" style={{ color: '#ffff', float: 'right', top: '14.6px' }} icon={<DashboardOutlined />}>Dashboard</Button> :
        <Button onClick={() => setWantToLogin(true)} type="link" style={{ color: '#ffff', float: 'right', top: '14.6px' }} icon={<LoginOutlined />}>Login</Button>}
      <Menu mode="horizontal" defaultSelectedKeys={page ? [page] : undefined} theme="dark" style={{ background: '#0088CC', position: 'relative', display: 'flex', justifyContent: 'right' }}>
        <Menu.Item onClick={() => history.push('/')} key="home">Home</Menu.Item>
        <Menu.Item onClick={() => history.push('/faq')} key="faq">FAQ</Menu.Item>
        <Menu.Item onClick={() => history.push('/pricing')} key="pricing">Pricing</Menu.Item>
        <Menu.Item onClick={() => history.push('/contact')} key="contact">Contact Us</Menu.Item>
        <Menu.Item onClick={() => history.push('/privacy')} key="privacy">Privacy Policy</Menu.Item>
        <Menu.Item onClick={() => history.push('/terms')} key="terms">Terms</Menu.Item>
      </Menu>
    </Layout.Header>
    <Modal visible={wantToLogin} title="Invitation Code" onCancel={() => setWantToLogin(false)} onOk={form.submit} okText="Continue">
      <Typography.Paragraph type="secondary">
        The access is limited for early users.
      </Typography.Paragraph>
      <Form form={form} onFinish={saveInvitationCode}>
        <Form.Item label="Code" name="code" rules={[{ required: true, message: 'Please input your invitation code' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  </>
}

export default Navbar