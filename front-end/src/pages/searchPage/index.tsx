import {propertiesMock} from '../../api/property.mock';

const properties = propertiesMock;

function SearchPage() {
  return (
     <div>{properties[0].title}</div>
  );
}

export default SearchPage;

