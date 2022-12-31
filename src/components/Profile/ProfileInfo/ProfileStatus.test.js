import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("Status from props should be in the state", () => {
    const component = create(<ProfileStatus status="hello" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("hello");
  });
  test("span with status should be displayed with correct status", () => {
    const component = create(<ProfileStatus status="hello" />);
    const root = component.root;
    let span = root.findByType('span')
    expect(span).not.toBeNull();
  });
  test("input shouldn't be displayed after creation", () => {
    const component = create(<ProfileStatus status="hello" />);
    const root = component.root;
    expect(() => {
        root.findByType('input')
    }).toThrow();
  });
  test("span with status should be displayed with correct status", () => {
    const component = create(<ProfileStatus status="hello" />);
    const root = component.root;
    let span = root.findByType('span')
    expect(span.children[0]).toBe('hello');
  });
  test("input should be displayed in edit mode instead of span", () => {
    const component = create(<ProfileStatus status="hello" />);
    const root = component.root;
    let span = root.findByType('span')
    span.props.onDoubleClick()
    let input = root.findByType('input')
    expect(input.props.value).toBe('hello'); 
  });
  test("callback should be called", () => {
    const mockCallback = jest.fn()
    const component = create(<ProfileStatus status="hello" updateStatus={mockCallback}/>);
    const instance = component.getInstance();
    instance.deactivateEditMode()
    expect(mockCallback.mock.calls.length).toBe(1); 
  });
});