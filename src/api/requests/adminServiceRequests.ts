import { Request } from "../api/Request";

import { UserRoleInfo } from "../../app/core/types/UserRoleInfo";
import { GroupInfo } from "../../app/core/types/GroupInfo";
import { UserRoleCreateRequest } from "../../app/core/types/UserRoleCreateRequest";
import { ProcessInfo } from "../../app/core/types/ProcessInfo";
import { GroupCreateRequest } from "../../app/core/types/GroupCreateRequest";
import { UserRequest } from "../../app/workflow/createNewUser/@types/UserRequest";
import { UserProcessInfo } from "../../app/workflow/createNewUser/@types/UserProcessInfo";
import { UserDeleteRequest } from "../../app/workflow/createNewUser/@types/UserDeleteRequest";
import { UserInfo } from "../../app/workflow/createNewUser/@types/UserInfo";
import { ProcessCreateRequest } from "../../app/core/types/ProcessCreateRequest";
import { ProcessAllocationRequest } from "../../app/core/types/ProcessAllocationRequest";
import { GroupAllocationRequest } from "../../app/core/types/GroupAllocationRequest";
import { GroupAllocationProcessInfo } from "../../app/workflow/userRoleGroupAllocation/types/GroupAllocationProcessInfo";
import { UserRoleAllocationRequest } from "../../app/core/types/UserRoleAllocationRequest";
import { UserRoleAllocationProcessInfo } from "../../app/workflow/userRoleAllocation/types/UserRoleAllocationProcessInfo";
import { ReportsInfo } from "../../app/core/types/ReportsInfo";
import { ReportAllocationRequestIf } from "../../app/core/types/ReportAllocationRequest";
import { Report } from "../../app/core/types/Report";
import { ReportCreateRequestIf } from "../../app/core/types/ReportCreateRequest";
import { Pageable } from "../types/Pageable";

export const adminServiceRequests = () => {
  const prefix = "admin";

  return {
    //** Get User Role informations  **/
    userRoleInfoList: () =>
      Request.GET<UserRoleInfo>(`${prefix}/master/user-role`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    //** Get All User Role informations  **/
    userAllRoleInfoList: () =>
      Request.GET<UserRoleInfo>(`${prefix}/master/user-role/all-roles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    //** Create new User Role  **/
    createUserRole: (request: UserRoleCreateRequest) =>
      Request.POST(`${prefix}/master/user-role`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    //** Update Usere Role  **/
    updateUserRole: (uuid: string, request: UserRoleCreateRequest) =>
      Request.PUT(`${prefix}/master/user-role/${uuid}`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    //** Delete Usere Role  **/
    deleteUserRole: (uuid: string) =>
      Request.DELETE(
        `${prefix}/master/user-role/${uuid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    //** Get Group informations  **/
    groupInfoList: () =>
      Request.GET<GroupInfo>(`${prefix}/master/group`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),


    fetchGroupListWithStatus: (processStatus: string | null) =>
      Request.GET<GroupInfo>(`${prefix}/master/group/all-groups`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          "process-def-key": processStatus
        }
      }),





    //** Create new Group  **/
    createGroup: (request: GroupCreateRequest) =>
      Request.POST(`${prefix}/master/group`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    //** Update Group  **/
    updateGroup: (uuid: string, request: UserRoleCreateRequest) =>
      Request.PUT(`${prefix}/master/group/${uuid}`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    //** Delete Group  **/
    deleteGroup: (uuid: string) =>
      Request.DELETE(
        `${prefix}/master/group/${uuid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),


    //** Delete Group  **/
    activateGroup: (uuid: string) =>
      Request.DELETE(
        `${prefix}/master/group/activate/${uuid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),


    //** Delete Group  **/
    deactivateGroup: (uuid: string) =>
      Request.DELETE(
        `${prefix}/master/group/deactivate/${uuid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),



    //** Create new Group Allocation **/
    createGroupAllocation: (request: GroupAllocationRequest) =>
      Request.POST(`${prefix}/master/group-allocation`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    //** Get allocated Group List  **/
    allocatedgroupList: (roleId: string) =>
      Request.GET<GroupInfo>(`${prefix}/master/group-allocation/allocated/${roleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    //getSignaturePath
    getSignaturePath: (id: string) =>
      Request.GET<string>(`${prefix}/master/user/getSignaturepath/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    allocatedgroupListByProcess: (roleId: string | null, process: string | null) =>
      Request.GET<GroupInfo>(`${prefix}/master/group-allocation/allocated/${roleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          "defKey": process
        }
      }),


    allocatedgroupListOtherThanProcess: (roleId: string | null, process: string | null) =>
      Request.GET<GroupInfo>(`${prefix}/master/group-allocation/allocated-not-in-process/${roleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          "defKey": process
        }
      }),

    //** Get un-allocated Group List  **/
    unAllocatedgroupList: (roleId: string) =>
      Request.GET<GroupInfo>(`${prefix}/master/group-allocation/un-allocated/${roleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    unAllocatedgroupListGroupByProcess: (roleId: string | null, process: string | null) =>

      Request.GET<GroupInfo>(`${prefix}/master/group-allocation/un-allocated/${roleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          "defKey": process
        }
      }),

    /** Get Allocated Role List 
     * 
     * @param userId of the selected user
     * @returns allocated userRoleInfo[]
    */
    getAllocatedRoleList: (uuid: string) =>
      Request.GET<UserRoleInfo[]>(`${prefix}/master/role-allocation/allocated/${uuid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
    ,

    /** Get Unallocated Role List
     *  
     * @param userId of the selected user
     * @returns unallocated userRoleInfo[]
    */
    getUnallocatedRoleList: (uuid: string) =>
      Request.GET<UserRoleInfo[]>(`${prefix}/master/role-allocation/un-allocated/${uuid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
    ,

    /** Create New Role Allocation
     * 
     * @param request user role allocation containing user id, role ids and process instance
     */
    allocateUserRoles: (request: UserRoleAllocationRequest) =>
      Request.POST(`${prefix}/master/role-allocation`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    ,

    /** Get User Role Allocation by Process ID
     * 
     * @param process instance Id 
     */
    getUserRoleAllocationByProcess: (processId: string) =>
      Request.GET<UserRoleAllocationProcessInfo>(`${prefix}/master/role-allocation/${processId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    ,

    //** Get Process informations  **/
    processInfoList: () =>
      Request.GET<ProcessInfo>(`${prefix}/master/process`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    //** Create new Process  **/
    createProcess: (request: ProcessCreateRequest) =>
      Request.POST(`${prefix}/master/process`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    //** Update Process  **/
    updateProcess: (uuid: string, request: ProcessCreateRequest) =>
      Request.PUT(`${prefix}/master/process/${uuid}`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    //** Delete Process  **/
    deleteProcess: (uuid: string) =>
      Request.DELETE(
        `${prefix}/master/process/${uuid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    //** Create new Process Allocation  **/
    allocateProcess: (request: ProcessAllocationRequest) =>
      Request.PUT(`${prefix}/master/process/allocation`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),


    /* Get role allocation process information by process instance
       *
       * @param idProcess relevant role allocation process id that need to get details
       * @returns UserProcessInfo
       */
    getGroupAllocationByProcess: (idProcess: string) =>
      Request.GET<GroupAllocationProcessInfo>(`${prefix}/master/group-allocation/${idProcess}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    //** Un-Allocate Process Allocation  **/
    unAllocateProcess: (request: ProcessAllocationRequest) =>
      Request.DELETE(`${prefix}/master/process/unallocated`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    //** Get Process Allocation List  **/
    allProcessAllocations: (processStatus: string | null) =>
      Request.GET(`${prefix}/master/process/allocation`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          "process-def-key": processStatus
        }
      }),

    /**
     * Create User
     *
     * @param request user creation data
     */
    saveUser: (request: UserRequest) =>
      Request.POST<void>(`${prefix}/master/user`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Update user details
     *
     * @param request user update data
     * @param id relevant user id that need to update
     */
    updateUser: (request: UserRequest, id: string) =>
      Request.PUT<void>(`${prefix}/master/user/${id}`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
   * Update user details
   *
   * @param id relevant user id that need to update
   * @param profileId user id that need to update
   */
    updateUserProfile: (id: string, profileId: string) =>
      Request.PUT<void>(`${prefix}/master/user/profile/${id}/${profileId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    //updateSignature
    updateSignature: (id: string, documentId: string,formData: FormData) =>
      Request.PUT<void>(`${prefix}/master/user/signature/${id}/${documentId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    
    /**
     * Get user process information by process instance
     *
     * @param idProcess relevant user process id that need to get details
     * @returns UserProcessInfo
     */
    getUserByProcess: (idProcess: string) =>
      Request.GET<UserProcessInfo>(`${prefix}/master/user/${idProcess}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Delete user
     *
     * @param request user delete request containing user id and proc instance
     */
    deleteUser: (request: UserDeleteRequest) =>
      Request.PUT<void>(`${prefix}/master/user`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Get All Users
     *
     * @returns UserInfo[]
     */
    getAllUsers: () =>
      Request.GET<UserInfo[]>(`${prefix}/master/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getAllUsersByAccountStatus: (accountStatus: string | null, name: string | null) =>
      Request.GET<UserInfo[]>(`${prefix}/master/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          'account-status': accountStatus,
          'name': name,
        }
      }),

    /**
     * Report Requests
    */

    createReport: (request: ReportCreateRequestIf) =>
      Request.POST<void>(`${prefix}/report/save`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    updateReport: (reportId: string | null, request: ReportCreateRequestIf) =>
      Request.PUT<void>(`${prefix}/report/${reportId}`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getReports: () =>
      Request.GET<ReportsInfo[]>(`${prefix}/report/menu/REPORT`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getAllReports: (
      size: number,
      page: number
    ) =>
      Request.GET<Pageable<Report>>(`${prefix}/report`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          size: size,
          page: page
        }
      }),

    createReportAllocation: (request: ReportAllocationRequestIf) =>
      Request.POST<void>(`${prefix}/report/allocate`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }),

    getAllocatedReports: (roleId: string) =>
      Request.GET<Report[]>(`${prefix}/report/allocation/${roleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),



    getUnAllocatedReports: (roleId: string) =>
      Request.GET<Report[]>(`${prefix}/report/nonallocation/${roleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getAccountStatus: () =>
      Request.GET<String[]>(`${prefix}/master/user/account-status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    
    bulkUserUpload: (formData: FormData) =>
      Request.POST(`${prefix}/master/user/bulk`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    bulkRoleAllocationUpload: (formData: FormData) =>
      Request.POST(`${prefix}/master/role-allocation/bulk-role-allocation`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    

  };

};
