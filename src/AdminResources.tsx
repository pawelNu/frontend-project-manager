import { Resource } from 'react-admin';
import { routes } from './config/routes';
import { EmployeeList } from './pages/company/employee/EmployeeList';
import { EmployeeShow } from './pages/company/employee/EmployeeShow';
import { EmployeeCreate } from './pages/company/employee/EmployeeCreate';
import { EmployeeEdit } from './pages/company/employee/EmployeeEdit';
import { AuthorityList } from './pages/authority/AuthorityList';
import { AuthorityShow } from './pages/authority/AuthorityShow';
import { AuthorityCreate } from './pages/authority/AuthorityCreate';
import { AuthorityEdit } from './pages/authority/AuthorityEdit';
import { CategoryCreate } from './pages/category/CategoryCreate';
import { CategoryEdit } from './pages/category/CategoryEdit';
import { CategoryList } from './pages/category/CategoryList';
import { CategoryShow } from './pages/category/CategoryShow';
import { CategoryValueCreate } from './pages/category/values/CategoryValueCreate';
import { CategoryValueEdit } from './pages/category/values/CategoryValueEdit';
import { CategoryValueList } from './pages/category/values/CategoryValueList';
import { CategoryValueShow } from './pages/category/values/CategoryValueShow';
import { CompanyEdit } from './pages/company/CompanyEdit';
import { CompanyShow } from './pages/company/CompanyShow';
import { CompanyAddressList } from './pages/company/address/CompanyAddressList';
import { CompanyAddressShow } from './pages/company/address/CompanyAddressShow';
import { CompanyAddressCreate } from './pages/company/address/CompanyAddressCreate';
import { CompanyAddressEdit } from './pages/company/address/CompanyAddressEdit';
import { CompanyCreate } from './pages/company/CompanyCreate';
import { CompanyList } from './pages/company/CompanyList';
import { EmployeeAuthorityList } from './pages/company/employee/authority/EmployeeAuthorityList';
import { EmployeeAuthorityShow } from './pages/company/employee/authority/EmployeeAuthorityShow';
import { EmployeeAuthorityCreate } from './pages/company/employee/authority/EmployeeAuthorityCreate';
import { ProjectList } from './pages/project/ProjectList';
import { ProjectShow } from './pages/project/ProjectShow';
import { ProjectCreate } from './pages/project/ProjectCreate';
import { ProjectEdit } from './pages/project/ProjectEdit';
import { ProjectStepList } from './pages/project/step/ProjectStepList';
import { ProjectStepShow } from './pages/project/step/ProjectStepShow';
import { ProjectStepCreate } from './pages/project/step/ProjectStepCreate';
import { ProjectStepEdit } from './pages/project/step/ProjectStepEdit';

export const AdminResources = [
    <Resource
        name={routes.authority.name()}
        list={AuthorityList}
        show={AuthorityShow}
        create={AuthorityCreate}
        edit={AuthorityEdit}
    />,
    <Resource
        name={routes.employeeAuthority.name()}
        list={EmployeeAuthorityList}
        show={EmployeeAuthorityShow}
        create={EmployeeAuthorityCreate}
    />,
    <Resource
        name={routes.category.name()}
        list={CategoryList}
        show={CategoryShow}
        create={CategoryCreate}
        edit={CategoryEdit}
    />,
    <Resource
        name={routes.categoryValue.name()}
        list={CategoryValueList}
        show={CategoryValueShow}
        create={CategoryValueCreate}
        edit={CategoryValueEdit}
    />,
    <Resource
        name={routes.company.name()}
        list={CompanyList}
        show={CompanyShow}
        create={CompanyCreate}
        edit={CompanyEdit}
    />,
    <Resource
        name={routes.companyAddress.name()}
        list={CompanyAddressList}
        show={CompanyAddressShow}
        create={CompanyAddressCreate}
        edit={CompanyAddressEdit}
    />,
    <Resource
        name={routes.employee.name()}
        list={EmployeeList}
        show={EmployeeShow}
        create={EmployeeCreate}
        edit={EmployeeEdit}
    />,
    <Resource
        name={routes.project.name()}
        list={ProjectList}
        show={ProjectShow}
        create={ProjectCreate}
        edit={ProjectEdit}
    />,
    <Resource
        name={routes.projectStep.name()}
        list={ProjectStepList}
        show={ProjectStepShow}
        create={ProjectStepCreate}
        edit={ProjectStepEdit}
    />,
];

// TODO feat ui for api project_step_comments
// TODO feat ui for api tickets
// TODO feat ui for api attachments
// TODO feat ui for api ticket_histories
