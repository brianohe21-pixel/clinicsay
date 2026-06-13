import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PatientAlertModel = runtime.Types.Result.DefaultSelection<Prisma.$PatientAlertPayload>;
export type AggregatePatientAlert = {
    _count: PatientAlertCountAggregateOutputType | null;
    _min: PatientAlertMinAggregateOutputType | null;
    _max: PatientAlertMaxAggregateOutputType | null;
};
export type PatientAlertMinAggregateOutputType = {
    id: string | null;
    patientId: string | null;
    type: $Enums.AlertType | null;
    severity: $Enums.AlertSeverity | null;
    message: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PatientAlertMaxAggregateOutputType = {
    id: string | null;
    patientId: string | null;
    type: $Enums.AlertType | null;
    severity: $Enums.AlertSeverity | null;
    message: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PatientAlertCountAggregateOutputType = {
    id: number;
    patientId: number;
    type: number;
    severity: number;
    message: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PatientAlertMinAggregateInputType = {
    id?: true;
    patientId?: true;
    type?: true;
    severity?: true;
    message?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PatientAlertMaxAggregateInputType = {
    id?: true;
    patientId?: true;
    type?: true;
    severity?: true;
    message?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PatientAlertCountAggregateInputType = {
    id?: true;
    patientId?: true;
    type?: true;
    severity?: true;
    message?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PatientAlertAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientAlertWhereInput;
    orderBy?: Prisma.PatientAlertOrderByWithRelationInput | Prisma.PatientAlertOrderByWithRelationInput[];
    cursor?: Prisma.PatientAlertWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PatientAlertCountAggregateInputType;
    _min?: PatientAlertMinAggregateInputType;
    _max?: PatientAlertMaxAggregateInputType;
};
export type GetPatientAlertAggregateType<T extends PatientAlertAggregateArgs> = {
    [P in keyof T & keyof AggregatePatientAlert]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePatientAlert[P]> : Prisma.GetScalarType<T[P], AggregatePatientAlert[P]>;
};
export type PatientAlertGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientAlertWhereInput;
    orderBy?: Prisma.PatientAlertOrderByWithAggregationInput | Prisma.PatientAlertOrderByWithAggregationInput[];
    by: Prisma.PatientAlertScalarFieldEnum[] | Prisma.PatientAlertScalarFieldEnum;
    having?: Prisma.PatientAlertScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PatientAlertCountAggregateInputType | true;
    _min?: PatientAlertMinAggregateInputType;
    _max?: PatientAlertMaxAggregateInputType;
};
export type PatientAlertGroupByOutputType = {
    id: string;
    patientId: string;
    type: $Enums.AlertType;
    severity: $Enums.AlertSeverity;
    message: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: PatientAlertCountAggregateOutputType | null;
    _min: PatientAlertMinAggregateOutputType | null;
    _max: PatientAlertMaxAggregateOutputType | null;
};
export type GetPatientAlertGroupByPayload<T extends PatientAlertGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PatientAlertGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PatientAlertGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PatientAlertGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PatientAlertGroupByOutputType[P]>;
}>>;
export type PatientAlertWhereInput = {
    AND?: Prisma.PatientAlertWhereInput | Prisma.PatientAlertWhereInput[];
    OR?: Prisma.PatientAlertWhereInput[];
    NOT?: Prisma.PatientAlertWhereInput | Prisma.PatientAlertWhereInput[];
    id?: Prisma.StringFilter<"PatientAlert"> | string;
    patientId?: Prisma.StringFilter<"PatientAlert"> | string;
    type?: Prisma.EnumAlertTypeFilter<"PatientAlert"> | $Enums.AlertType;
    severity?: Prisma.EnumAlertSeverityFilter<"PatientAlert"> | $Enums.AlertSeverity;
    message?: Prisma.StringFilter<"PatientAlert"> | string;
    isActive?: Prisma.BoolFilter<"PatientAlert"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PatientAlert"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PatientAlert"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
};
export type PatientAlertOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    patient?: Prisma.PatientOrderByWithRelationInput;
};
export type PatientAlertWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PatientAlertWhereInput | Prisma.PatientAlertWhereInput[];
    OR?: Prisma.PatientAlertWhereInput[];
    NOT?: Prisma.PatientAlertWhereInput | Prisma.PatientAlertWhereInput[];
    patientId?: Prisma.StringFilter<"PatientAlert"> | string;
    type?: Prisma.EnumAlertTypeFilter<"PatientAlert"> | $Enums.AlertType;
    severity?: Prisma.EnumAlertSeverityFilter<"PatientAlert"> | $Enums.AlertSeverity;
    message?: Prisma.StringFilter<"PatientAlert"> | string;
    isActive?: Prisma.BoolFilter<"PatientAlert"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PatientAlert"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PatientAlert"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
}, "id">;
export type PatientAlertOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PatientAlertCountOrderByAggregateInput;
    _max?: Prisma.PatientAlertMaxOrderByAggregateInput;
    _min?: Prisma.PatientAlertMinOrderByAggregateInput;
};
export type PatientAlertScalarWhereWithAggregatesInput = {
    AND?: Prisma.PatientAlertScalarWhereWithAggregatesInput | Prisma.PatientAlertScalarWhereWithAggregatesInput[];
    OR?: Prisma.PatientAlertScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PatientAlertScalarWhereWithAggregatesInput | Prisma.PatientAlertScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PatientAlert"> | string;
    patientId?: Prisma.StringWithAggregatesFilter<"PatientAlert"> | string;
    type?: Prisma.EnumAlertTypeWithAggregatesFilter<"PatientAlert"> | $Enums.AlertType;
    severity?: Prisma.EnumAlertSeverityWithAggregatesFilter<"PatientAlert"> | $Enums.AlertSeverity;
    message?: Prisma.StringWithAggregatesFilter<"PatientAlert"> | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"PatientAlert"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PatientAlert"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PatientAlert"> | Date | string;
};
export type PatientAlertCreateInput = {
    id?: string;
    type: $Enums.AlertType;
    severity: $Enums.AlertSeverity;
    message: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutAlertsInput;
};
export type PatientAlertUncheckedCreateInput = {
    id?: string;
    patientId: string;
    type: $Enums.AlertType;
    severity: $Enums.AlertSeverity;
    message: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientAlertUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAlertTypeFieldUpdateOperationsInput | $Enums.AlertType;
    severity?: Prisma.EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutAlertsNestedInput;
};
export type PatientAlertUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    patientId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAlertTypeFieldUpdateOperationsInput | $Enums.AlertType;
    severity?: Prisma.EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientAlertCreateManyInput = {
    id?: string;
    patientId: string;
    type: $Enums.AlertType;
    severity: $Enums.AlertSeverity;
    message: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientAlertUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAlertTypeFieldUpdateOperationsInput | $Enums.AlertType;
    severity?: Prisma.EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientAlertUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    patientId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAlertTypeFieldUpdateOperationsInput | $Enums.AlertType;
    severity?: Prisma.EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientAlertListRelationFilter = {
    every?: Prisma.PatientAlertWhereInput;
    some?: Prisma.PatientAlertWhereInput;
    none?: Prisma.PatientAlertWhereInput;
};
export type PatientAlertOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PatientAlertCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientAlertMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientAlertMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientAlertCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.PatientAlertCreateWithoutPatientInput, Prisma.PatientAlertUncheckedCreateWithoutPatientInput> | Prisma.PatientAlertCreateWithoutPatientInput[] | Prisma.PatientAlertUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientAlertCreateOrConnectWithoutPatientInput | Prisma.PatientAlertCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.PatientAlertCreateManyPatientInputEnvelope;
    connect?: Prisma.PatientAlertWhereUniqueInput | Prisma.PatientAlertWhereUniqueInput[];
};
export type PatientAlertUncheckedCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.PatientAlertCreateWithoutPatientInput, Prisma.PatientAlertUncheckedCreateWithoutPatientInput> | Prisma.PatientAlertCreateWithoutPatientInput[] | Prisma.PatientAlertUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientAlertCreateOrConnectWithoutPatientInput | Prisma.PatientAlertCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.PatientAlertCreateManyPatientInputEnvelope;
    connect?: Prisma.PatientAlertWhereUniqueInput | Prisma.PatientAlertWhereUniqueInput[];
};
export type PatientAlertUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.PatientAlertCreateWithoutPatientInput, Prisma.PatientAlertUncheckedCreateWithoutPatientInput> | Prisma.PatientAlertCreateWithoutPatientInput[] | Prisma.PatientAlertUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientAlertCreateOrConnectWithoutPatientInput | Prisma.PatientAlertCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.PatientAlertUpsertWithWhereUniqueWithoutPatientInput | Prisma.PatientAlertUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.PatientAlertCreateManyPatientInputEnvelope;
    set?: Prisma.PatientAlertWhereUniqueInput | Prisma.PatientAlertWhereUniqueInput[];
    disconnect?: Prisma.PatientAlertWhereUniqueInput | Prisma.PatientAlertWhereUniqueInput[];
    delete?: Prisma.PatientAlertWhereUniqueInput | Prisma.PatientAlertWhereUniqueInput[];
    connect?: Prisma.PatientAlertWhereUniqueInput | Prisma.PatientAlertWhereUniqueInput[];
    update?: Prisma.PatientAlertUpdateWithWhereUniqueWithoutPatientInput | Prisma.PatientAlertUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.PatientAlertUpdateManyWithWhereWithoutPatientInput | Prisma.PatientAlertUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.PatientAlertScalarWhereInput | Prisma.PatientAlertScalarWhereInput[];
};
export type PatientAlertUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.PatientAlertCreateWithoutPatientInput, Prisma.PatientAlertUncheckedCreateWithoutPatientInput> | Prisma.PatientAlertCreateWithoutPatientInput[] | Prisma.PatientAlertUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientAlertCreateOrConnectWithoutPatientInput | Prisma.PatientAlertCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.PatientAlertUpsertWithWhereUniqueWithoutPatientInput | Prisma.PatientAlertUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.PatientAlertCreateManyPatientInputEnvelope;
    set?: Prisma.PatientAlertWhereUniqueInput | Prisma.PatientAlertWhereUniqueInput[];
    disconnect?: Prisma.PatientAlertWhereUniqueInput | Prisma.PatientAlertWhereUniqueInput[];
    delete?: Prisma.PatientAlertWhereUniqueInput | Prisma.PatientAlertWhereUniqueInput[];
    connect?: Prisma.PatientAlertWhereUniqueInput | Prisma.PatientAlertWhereUniqueInput[];
    update?: Prisma.PatientAlertUpdateWithWhereUniqueWithoutPatientInput | Prisma.PatientAlertUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.PatientAlertUpdateManyWithWhereWithoutPatientInput | Prisma.PatientAlertUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.PatientAlertScalarWhereInput | Prisma.PatientAlertScalarWhereInput[];
};
export type EnumAlertTypeFieldUpdateOperationsInput = {
    set?: $Enums.AlertType;
};
export type EnumAlertSeverityFieldUpdateOperationsInput = {
    set?: $Enums.AlertSeverity;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type PatientAlertCreateWithoutPatientInput = {
    id?: string;
    type: $Enums.AlertType;
    severity: $Enums.AlertSeverity;
    message: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientAlertUncheckedCreateWithoutPatientInput = {
    id?: string;
    type: $Enums.AlertType;
    severity: $Enums.AlertSeverity;
    message: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientAlertCreateOrConnectWithoutPatientInput = {
    where: Prisma.PatientAlertWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientAlertCreateWithoutPatientInput, Prisma.PatientAlertUncheckedCreateWithoutPatientInput>;
};
export type PatientAlertCreateManyPatientInputEnvelope = {
    data: Prisma.PatientAlertCreateManyPatientInput | Prisma.PatientAlertCreateManyPatientInput[];
};
export type PatientAlertUpsertWithWhereUniqueWithoutPatientInput = {
    where: Prisma.PatientAlertWhereUniqueInput;
    update: Prisma.XOR<Prisma.PatientAlertUpdateWithoutPatientInput, Prisma.PatientAlertUncheckedUpdateWithoutPatientInput>;
    create: Prisma.XOR<Prisma.PatientAlertCreateWithoutPatientInput, Prisma.PatientAlertUncheckedCreateWithoutPatientInput>;
};
export type PatientAlertUpdateWithWhereUniqueWithoutPatientInput = {
    where: Prisma.PatientAlertWhereUniqueInput;
    data: Prisma.XOR<Prisma.PatientAlertUpdateWithoutPatientInput, Prisma.PatientAlertUncheckedUpdateWithoutPatientInput>;
};
export type PatientAlertUpdateManyWithWhereWithoutPatientInput = {
    where: Prisma.PatientAlertScalarWhereInput;
    data: Prisma.XOR<Prisma.PatientAlertUpdateManyMutationInput, Prisma.PatientAlertUncheckedUpdateManyWithoutPatientInput>;
};
export type PatientAlertScalarWhereInput = {
    AND?: Prisma.PatientAlertScalarWhereInput | Prisma.PatientAlertScalarWhereInput[];
    OR?: Prisma.PatientAlertScalarWhereInput[];
    NOT?: Prisma.PatientAlertScalarWhereInput | Prisma.PatientAlertScalarWhereInput[];
    id?: Prisma.StringFilter<"PatientAlert"> | string;
    patientId?: Prisma.StringFilter<"PatientAlert"> | string;
    type?: Prisma.EnumAlertTypeFilter<"PatientAlert"> | $Enums.AlertType;
    severity?: Prisma.EnumAlertSeverityFilter<"PatientAlert"> | $Enums.AlertSeverity;
    message?: Prisma.StringFilter<"PatientAlert"> | string;
    isActive?: Prisma.BoolFilter<"PatientAlert"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PatientAlert"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PatientAlert"> | Date | string;
};
export type PatientAlertCreateManyPatientInput = {
    id?: string;
    type: $Enums.AlertType;
    severity: $Enums.AlertSeverity;
    message: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientAlertUpdateWithoutPatientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAlertTypeFieldUpdateOperationsInput | $Enums.AlertType;
    severity?: Prisma.EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientAlertUncheckedUpdateWithoutPatientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAlertTypeFieldUpdateOperationsInput | $Enums.AlertType;
    severity?: Prisma.EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientAlertUncheckedUpdateManyWithoutPatientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumAlertTypeFieldUpdateOperationsInput | $Enums.AlertType;
    severity?: Prisma.EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientAlertSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    type?: boolean;
    severity?: boolean;
    message?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patientAlert"]>;
export type PatientAlertSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    type?: boolean;
    severity?: boolean;
    message?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patientAlert"]>;
export type PatientAlertSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    type?: boolean;
    severity?: boolean;
    message?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patientAlert"]>;
export type PatientAlertSelectScalar = {
    id?: boolean;
    patientId?: boolean;
    type?: boolean;
    severity?: boolean;
    message?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PatientAlertOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "patientId" | "type" | "severity" | "message" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["patientAlert"]>;
export type PatientAlertInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type PatientAlertIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type PatientAlertIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type $PatientAlertPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PatientAlert";
    objects: {
        patient: Prisma.$PatientPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        patientId: string;
        type: $Enums.AlertType;
        severity: $Enums.AlertSeverity;
        message: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["patientAlert"]>;
    composites: {};
};
export type PatientAlertGetPayload<S extends boolean | null | undefined | PatientAlertDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PatientAlertPayload, S>;
export type PatientAlertCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PatientAlertFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PatientAlertCountAggregateInputType | true;
};
export interface PatientAlertDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PatientAlert'];
        meta: {
            name: 'PatientAlert';
        };
    };
    findUnique<T extends PatientAlertFindUniqueArgs>(args: Prisma.SelectSubset<T, PatientAlertFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PatientAlertClient<runtime.Types.Result.GetResult<Prisma.$PatientAlertPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PatientAlertFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PatientAlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientAlertClient<runtime.Types.Result.GetResult<Prisma.$PatientAlertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PatientAlertFindFirstArgs>(args?: Prisma.SelectSubset<T, PatientAlertFindFirstArgs<ExtArgs>>): Prisma.Prisma__PatientAlertClient<runtime.Types.Result.GetResult<Prisma.$PatientAlertPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PatientAlertFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PatientAlertFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientAlertClient<runtime.Types.Result.GetResult<Prisma.$PatientAlertPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PatientAlertFindManyArgs>(args?: Prisma.SelectSubset<T, PatientAlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientAlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PatientAlertCreateArgs>(args: Prisma.SelectSubset<T, PatientAlertCreateArgs<ExtArgs>>): Prisma.Prisma__PatientAlertClient<runtime.Types.Result.GetResult<Prisma.$PatientAlertPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PatientAlertCreateManyArgs>(args?: Prisma.SelectSubset<T, PatientAlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PatientAlertCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PatientAlertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientAlertPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PatientAlertDeleteArgs>(args: Prisma.SelectSubset<T, PatientAlertDeleteArgs<ExtArgs>>): Prisma.Prisma__PatientAlertClient<runtime.Types.Result.GetResult<Prisma.$PatientAlertPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PatientAlertUpdateArgs>(args: Prisma.SelectSubset<T, PatientAlertUpdateArgs<ExtArgs>>): Prisma.Prisma__PatientAlertClient<runtime.Types.Result.GetResult<Prisma.$PatientAlertPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PatientAlertDeleteManyArgs>(args?: Prisma.SelectSubset<T, PatientAlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PatientAlertUpdateManyArgs>(args: Prisma.SelectSubset<T, PatientAlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PatientAlertUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PatientAlertUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientAlertPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PatientAlertUpsertArgs>(args: Prisma.SelectSubset<T, PatientAlertUpsertArgs<ExtArgs>>): Prisma.Prisma__PatientAlertClient<runtime.Types.Result.GetResult<Prisma.$PatientAlertPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PatientAlertCountArgs>(args?: Prisma.Subset<T, PatientAlertCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PatientAlertCountAggregateOutputType> : number>;
    aggregate<T extends PatientAlertAggregateArgs>(args: Prisma.Subset<T, PatientAlertAggregateArgs>): Prisma.PrismaPromise<GetPatientAlertAggregateType<T>>;
    groupBy<T extends PatientAlertGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PatientAlertGroupByArgs['orderBy'];
    } : {
        orderBy?: PatientAlertGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PatientAlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PatientAlertFieldRefs;
}
export interface Prisma__PatientAlertClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    patient<T extends Prisma.PatientDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientDefaultArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PatientAlertFieldRefs {
    readonly id: Prisma.FieldRef<"PatientAlert", 'String'>;
    readonly patientId: Prisma.FieldRef<"PatientAlert", 'String'>;
    readonly type: Prisma.FieldRef<"PatientAlert", 'AlertType'>;
    readonly severity: Prisma.FieldRef<"PatientAlert", 'AlertSeverity'>;
    readonly message: Prisma.FieldRef<"PatientAlert", 'String'>;
    readonly isActive: Prisma.FieldRef<"PatientAlert", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"PatientAlert", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PatientAlert", 'DateTime'>;
}
export type PatientAlertFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientAlertSelect<ExtArgs> | null;
    omit?: Prisma.PatientAlertOmit<ExtArgs> | null;
    include?: Prisma.PatientAlertInclude<ExtArgs> | null;
    where: Prisma.PatientAlertWhereUniqueInput;
};
export type PatientAlertFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientAlertSelect<ExtArgs> | null;
    omit?: Prisma.PatientAlertOmit<ExtArgs> | null;
    include?: Prisma.PatientAlertInclude<ExtArgs> | null;
    where: Prisma.PatientAlertWhereUniqueInput;
};
export type PatientAlertFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientAlertSelect<ExtArgs> | null;
    omit?: Prisma.PatientAlertOmit<ExtArgs> | null;
    include?: Prisma.PatientAlertInclude<ExtArgs> | null;
    where?: Prisma.PatientAlertWhereInput;
    orderBy?: Prisma.PatientAlertOrderByWithRelationInput | Prisma.PatientAlertOrderByWithRelationInput[];
    cursor?: Prisma.PatientAlertWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PatientAlertScalarFieldEnum | Prisma.PatientAlertScalarFieldEnum[];
};
export type PatientAlertFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientAlertSelect<ExtArgs> | null;
    omit?: Prisma.PatientAlertOmit<ExtArgs> | null;
    include?: Prisma.PatientAlertInclude<ExtArgs> | null;
    where?: Prisma.PatientAlertWhereInput;
    orderBy?: Prisma.PatientAlertOrderByWithRelationInput | Prisma.PatientAlertOrderByWithRelationInput[];
    cursor?: Prisma.PatientAlertWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PatientAlertScalarFieldEnum | Prisma.PatientAlertScalarFieldEnum[];
};
export type PatientAlertFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientAlertSelect<ExtArgs> | null;
    omit?: Prisma.PatientAlertOmit<ExtArgs> | null;
    include?: Prisma.PatientAlertInclude<ExtArgs> | null;
    where?: Prisma.PatientAlertWhereInput;
    orderBy?: Prisma.PatientAlertOrderByWithRelationInput | Prisma.PatientAlertOrderByWithRelationInput[];
    cursor?: Prisma.PatientAlertWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PatientAlertScalarFieldEnum | Prisma.PatientAlertScalarFieldEnum[];
};
export type PatientAlertCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientAlertSelect<ExtArgs> | null;
    omit?: Prisma.PatientAlertOmit<ExtArgs> | null;
    include?: Prisma.PatientAlertInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PatientAlertCreateInput, Prisma.PatientAlertUncheckedCreateInput>;
};
export type PatientAlertCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PatientAlertCreateManyInput | Prisma.PatientAlertCreateManyInput[];
};
export type PatientAlertCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientAlertSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PatientAlertOmit<ExtArgs> | null;
    data: Prisma.PatientAlertCreateManyInput | Prisma.PatientAlertCreateManyInput[];
    include?: Prisma.PatientAlertIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PatientAlertUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientAlertSelect<ExtArgs> | null;
    omit?: Prisma.PatientAlertOmit<ExtArgs> | null;
    include?: Prisma.PatientAlertInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PatientAlertUpdateInput, Prisma.PatientAlertUncheckedUpdateInput>;
    where: Prisma.PatientAlertWhereUniqueInput;
};
export type PatientAlertUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PatientAlertUpdateManyMutationInput, Prisma.PatientAlertUncheckedUpdateManyInput>;
    where?: Prisma.PatientAlertWhereInput;
    limit?: number;
};
export type PatientAlertUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientAlertSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PatientAlertOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PatientAlertUpdateManyMutationInput, Prisma.PatientAlertUncheckedUpdateManyInput>;
    where?: Prisma.PatientAlertWhereInput;
    limit?: number;
    include?: Prisma.PatientAlertIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PatientAlertUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientAlertSelect<ExtArgs> | null;
    omit?: Prisma.PatientAlertOmit<ExtArgs> | null;
    include?: Prisma.PatientAlertInclude<ExtArgs> | null;
    where: Prisma.PatientAlertWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientAlertCreateInput, Prisma.PatientAlertUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PatientAlertUpdateInput, Prisma.PatientAlertUncheckedUpdateInput>;
};
export type PatientAlertDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientAlertSelect<ExtArgs> | null;
    omit?: Prisma.PatientAlertOmit<ExtArgs> | null;
    include?: Prisma.PatientAlertInclude<ExtArgs> | null;
    where: Prisma.PatientAlertWhereUniqueInput;
};
export type PatientAlertDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientAlertWhereInput;
    limit?: number;
};
export type PatientAlertDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientAlertSelect<ExtArgs> | null;
    omit?: Prisma.PatientAlertOmit<ExtArgs> | null;
    include?: Prisma.PatientAlertInclude<ExtArgs> | null;
};
