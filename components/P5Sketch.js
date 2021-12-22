import { ReactP5Wrapper } from 'react-p5-wrapper';
import styled from 'styled-components';
import pilotSketch from '../sketch';

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  border: 1px solid black;

  & > div {
    position: relative;
    display: inline-flex;
  }
`;

const Sketch = ({ children, ...props }) => (
  <Wrapper>
    <ReactP5Wrapper sketch={pilotSketch} {...props}>
      {children}
    </ReactP5Wrapper>
  </Wrapper>
);

export default Sketch;
