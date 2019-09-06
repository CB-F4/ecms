import styled from "styled-components";

export const CardStyle = styled.div`
  height: calc(100vh);
  background: #5d5d5d;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .ant-card {
    width: 400px;
    margin-top: -200px;
    background: #adadad;
  }
  .ant-card-head {
    background: #5d5d5d;
  }
  .ant-card-head-title {
    color: #a0c334;
  }
`;
