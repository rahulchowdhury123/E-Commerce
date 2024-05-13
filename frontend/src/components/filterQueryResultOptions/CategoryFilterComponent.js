import { Form } from "react-bootstrap";

const CategoryFilterComponent = () => {
  return (
    <>
    <span className="fw-bold">Category</span>
    <Form>
      {Array.from({length:5}).map((_,idx) => (
        <div key={idx} className="mb-3">
          <Form.Check type="checkbox" id={`check-api-${idx}`}>
            <Form.Check.Input style={{cursor:"pointer", marginTop:"0.35em"}} type="checkbox" isValid />
            <Form.Check.Label>Category {idx+1}</Form.Check.Label>
          
          </Form.Check>
        </div>
      ))}
    </Form>
    </>
  );
};

export default CategoryFilterComponent;
