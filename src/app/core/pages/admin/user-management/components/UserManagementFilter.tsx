import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import { useThemeMediaQuery } from "../../../../../../@edgevantage/hooks";
import EdgeButton from "../../../../../../@edgevantage/core/EdgeButton/EdgeButton";
import { Api } from "../../../../../../api/Api";


export type UserMgtFilters = {
  accountStatus: string | null;
};

type UserManagementFilterProps = {
  handlePassFilters: (form: UserMgtFilters) => void;
  setSearch: (search: string) => void;
  search: string;
};

const defaultValues: UserMgtFilters = {
  accountStatus: null,
};

const schema = z.object({
  accountStatus: z.string().nullable().optional(),
});

const UserManagementFilter: FC<UserManagementFilterProps> = (props) => {
  const { handlePassFilters, setSearch, search } = props;
  const [accountStatus, setAccountStatus] = useState<string[] | null>(null);
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearchError, setIsSearchError] = useState<boolean>(false);

  const fetchAccountStatusList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.getAccountStatus()
    );
    if (data !== null) {
      setAccountStatus(data);
    }
    else {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAccountStatusList();
  }, []);

  const { control, handleSubmit, formState } = useForm<UserMgtFilters>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const handleOnSubmit = async (formData: UserMgtFilters) => {
    console.log("formData", formData);
    handlePassFilters(formData);
  };

  useEffect(() => {
    if (search.length < 3 && search !== "") {
      setSearchError("Search must be at least 3 characters");
    } else {
      setSearchError(null);
    }
  }, [search]);

  return (
    <Paper className="my-12 p-6">

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div
          className={`grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-3 
            ${mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2 sm:p-6"
              : "sm:grid-cols-3 md:grid-cols-1 sm:p-6"
            } lg:grid-cols-4`}
        >

          <TextField
            label="Search"
            type="text"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsSearchError(true)}
            error={isSearchError}
            helperText={isSearchError && searchError}

          />
          <Controller
            name="accountStatus"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={accountStatus || []}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, val) => option === val}
                value={accountStatus ? accountStatus.find((o) => o === value) : null}
                onChange={(event, newValue) => {
                  onChange(newValue ? newValue : null);
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Status"
                    variant="outlined"
                    // required
                    size="small"
                    error={!!errors.accountStatus}
                    helperText={errors?.accountStatus?.message}
                    InputLabelProps={{
                      sx: {
                        "&.Mui-focused": {
                          color: "#FF181B",
                          fontWeight: 600,
                        },
                      },
                      shrink: true,
                    }}
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: 2,
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#FF181B",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#FF181B",
                        },
                      },
                    }}
                  />
                )}
              />
            )}
          />

          <div className="flex justify-center my-6">
            <EdgeButton label="Search" icon="feather:search" type="submit" />
          </div>

        </div>
      </form>
    </Paper>
  );
};

export default UserManagementFilter;
