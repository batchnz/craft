import { getByRole, render } from "@testing-library/vue";
import HelloWorld from "./HelloWorld";

describe("The Hello World component", () => {
  const testProps = {
    info: {
      craftVersion: "3.5.0",
      environment: "Test"
    }
  };

  it("renders a hello world heading", () => {
    const { getByRole } = render(HelloWorld, { propsData: testProps });

    expect(getByRole("heading", { name: "Hello World" })).toBeInTheDocument();
  });

  it("renders information about Craft", () => {
    const { getByText } = render(HelloWorld, { propsData: testProps });

    const { craftVersion, environment } = testProps.info;

    expect(getByText(craftVersion)).toBeInTheDocument();
    expect(getByText(environment)).toBeInTheDocument();
  });
});
