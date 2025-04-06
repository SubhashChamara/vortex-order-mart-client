import { RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

interface CCAprovalStatusProps {
    editable: boolean
}

const CCAprovalStatus: React.FC<CCAprovalStatusProps> = ({ editable }) => {
    const { control } = useFormContext();


    return (
        <div>
            <Controller
                name="ccApprovalStatus"
                control={control}
                render={({ field: { value, onChange, ...rest } }) => (
                    <RadioGroup
                        value={value}
                        onChange={(e) => onChange(e.target.value === "true")}
                        {...rest}
                    >
                        <div className="flex justify-between items-center w-full flex-row">
                            <p className="font-bold">Status:</p>
                            <div className="flex items-center gap-4">
                                <FormControlLabel
                                    disabled={!editable}
                                    value="true"
                                    control={<Radio />}
                                    label="Approved"
                                    className="text-gray-700"
                                />
                                <FormControlLabel
                                    disabled={!editable}
                                    value="false"
                                    control={<Radio />}
                                    label="Rejected"
                                    className="text-gray-700"
                                />
                            </div>
                        </div>
                    </RadioGroup>
                )}
            />
        </div>
    )
}

export default CCAprovalStatus
