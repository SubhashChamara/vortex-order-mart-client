import {
    Grid,
    Box,
    Container,
    Paper,
    List,
    ListItem,
    ListItemButton,
    ListItemText,

} from '@mui/material';
import { ManageAccounts, People } from '@mui/icons-material';
import EdgeSvgIcon from '../../../../@core/ui/EdgeSvgIcon';
import PersonalInfo from './components/PersonalInfo';
import { useEffect, useState } from 'react';
import Logger from '../../../../@helpers/Logger';
import { UserRoleInfo } from '../../types/UserRoleInfo';
import { Api } from '../../../../api/Api';
import { useAuthContext } from '../../../../@context/AuthContext';
import Ve3SelectCard from '../../../../@core/ui/Ve3SelectCard';
import { GroupInfo } from '../../types/GroupInfo';
import Ve3LoadingScreen from '../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen';
import { EncodeUrlPath } from '../../../../@helpers/RetriveFiles';


const Profile = () => {
    const { user } = useAuthContext();
    const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
    const [groupList, setGroupList] = useState<GroupInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [roleList, setRoleList] = useState<UserRoleInfo[]>([]);
    const [blobObj, setBlobObj] = useState<Blob | null>(null);
    const fetchAllocatedUserRoleData = async (userId: string) => {

        try {
            const { data, err } = await Api.performRequest((r) =>
                r.admin.getAllocatedRoleList(userId)
            );

            Logger.debug(
                "(Role Allocation Process) => { DATA: " +
                JSON.stringify(data) +
                " , ERROR: " +
                JSON.stringify(err)
            );

            if (data !== null) {
                setRoleList(data);
            }
        } catch (err) {
            console.log(err);
        }

    };

    let blobs: Blob | null = null;
    const handleFetchDocument = async (FileUrl: string) => {
    
        try {
          const response = await fetch(FileUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/pdf",
            },
          });
    
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
    
          blobs = await response.blob();
          console.log("handleFetchDocument-",blobs)
          setBlobObj(blobs);
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        } finally {
        }
      };

    useEffect(() => {
        fetchAllocatedUserRoleData(user?.uuid ?? "");

        const fetchSignaturePath = async (userId: string) => {
    
            const { data, err } = await Api.performRequest((r) =>
            r.admin.getSignaturePath(userId)
            );
            console.log("getSignaturePath-",data)
            if (data !== null) {
              await Promise.all([
          handleFetchDocument(EncodeUrlPath(data)),
              ]);
            }
          };

          fetchSignaturePath(user?.uuid ?? "")

    }, [user]);

    const fetchGroupListForUserRole = async (userRole: UserRoleInfo) => {
        try {
            setIsLoading(true);
            const { data, err } = await Api.performRequest((r) =>
                r.admin.allocatedgroupList(userRole.id));
            if (data !== null) {
                setGroupList(data);
            } else {
                setGroupList([]);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }

    };

    const handleSelectCard = async (role: UserRoleInfo) => {
        setGroupList([]);
        setSelectedRoleId(role.id);
        fetchGroupListForUserRole(role);
    }


    return (
        <>
            <Paper className="my-12 p-6 mx-12">
                <div className="flex ">
                    <EdgeSvgIcon
                        className="icon-size-28 cursor-pointer bg-primary text-white"
                        color="error"
                        borderRadius={1}
                    >
                        material-solid:person
                    </EdgeSvgIcon>
                    <div className="text-red-600 font-bold flex-col pl-6">
                        <div>My Profile</div>
                        <div className="text-[12px] text-gray">
                            Your Information.
                        </div>
                    </div>
                </div>
            </Paper>

            <Container className='max-w-full ' sx={{ mt: 2 }} >
                <Grid container spacing={3} >
                    <PersonalInfo user={user ?? null} blobObj={blobObj}/>
                    <Grid item xs={12} md={4} marginBottom={4}>
                        <Paper
                            className='p-10 rounded-md h-screen'
                            sx={{ height: 230, overflow: 'auto' }}
                        >
                            <Box sx={{ mb: 2 }} className="flex bg-gray-400 p-6" borderRadius={1}>
                                <ManageAccounts className='ml-4' />
                                <div className="text-[18px] text-black font-600">
                                    User Roles
                                </div>
                            </Box>
                            {roleList?.map((role, index) => (
                                <div
                                    key={index}
                                    className="w-full mb-4"
                                >
                                    <Ve3SelectCard
                                        label={role.name}
                                        isSelected={role.id === selectedRoleId}
                                        onClick={() => handleSelectCard(role)}                                            // isSelected={ }
                                    />
                                </div>
                            ))}
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4} marginBottom={4} minHeight={500}>
                        <Paper
                            className='p-10 rounded-md h-screen'
                            sx={{ height: 230, overflow: 'auto' }}
                        >
                            <Box sx={{ mb: 2 }} className="flex bg-gray-400 p-6" borderRadius={2}>
                                <People className='ml-4' />
                                <div className="text-[18px] text-black font-600">
                                    User Groups
                                </div>
                            </Box>
                            {(!isLoading) && groupList?.map((group, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-md border-2 m-4 p-4 px-12 flex gap-3 hover:bg-gray-100 cursor-pointer"
                                >
                                    {group.name}
                                </div>
                            )) || (
                                    <Ve3LoadingScreen />
                                )


                            }
                            {(groupList.length === 0 && (
                                <div className="text-center text-gray-400 text-[18px] font-600">No Group Allocated to this role</div>
                            ))
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Profile;

