import Endpoint from './endpoint';

export default class API {
    name: string;
    active: boolean;
    description: string;
    endpoints: Endpoint[];
}