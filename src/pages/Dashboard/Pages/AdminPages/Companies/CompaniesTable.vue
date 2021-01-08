<template>
	<div class="row">
		<div class="col-12">
			<card card-body-classes="table-full-width" no-footer-line>
				<h4 slot="header" class="card-title">Paginated Tables</h4>
				<div>
					<div
						class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
					>
						<el-select
							class="select-primary mb-3"
							style="width: 200px"
							v-model="pagination.perPage"
							placeholder="Per page"
						>
							<el-option
								class="select-default"
								v-for="item in pagination.perPageOptions"
								:key="item"
								:label="item"
								:value="item"
							>
							</el-option>
						</el-select>
						<fg-input>
							<el-input
								type="search"
								class="mb-3"
								clearable
								prefix-icon="el-icon-search"
								style="width: 200px"
								placeholder="Search records"
								v-model="searchQuery"
								aria-controls="datatables"
							>
							</el-input>
						</fg-input>
					</div>
					<el-table stripe style="width: 100%;" :data="tableData">
						<el-table-column
							v-for="column in tableColumns"
							:key="column.label"
							:min-width="column.minWidth"
							:prop="column.prop"
							:label="column.label"
						>
						</el-table-column>
						<el-table-column
							:min-width="135"
							fixed="right"
							label="Actions"
						>
							<div slot-scope="props" class="table-actions">
								<n-button
									@click.native="
										handleEdit(props.$index, props.row)
									"
									class="edit"
									type="warning"
									size="sm"
									round
									icon
								>
									<i class="fa fa-calendar"></i>
								</n-button>
								<n-button
									@click.native="
										handleDelete(props.$index, props.row)
									"
									class="remove"
									type="danger"
									size="sm"
									round
									icon
								>
									<i class="fa fa-times"></i>
								</n-button>
							</div>
						</el-table-column>
					</el-table>
				</div>
				<div
					slot="footer"
					class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
				>
					<div class="">
						<p class="card-category">
							Showing {{ from + 1 }} to {{ to }} of
							{{ total }} entries
						</p>
					</div>
					<n-pagination
						class="pagination-no-border"
						v-model="pagination.currentPage"
						:per-page="pagination.perPage"
						:total="total"
					>
					</n-pagination>
				</div>
			</card>
		</div>
	</div>
</template>
<script>
import { Table, TableColumn, Select, Option } from "element-ui";
import { Pagination as NPagination } from "src/components";
import Swal from "sweetalert2";

export default {
	components: {
		NPagination,
		[Select.name]: Select,
		[Option.name]: Option,
		[Table.name]: Table,
		[TableColumn.name]: TableColumn
	},
	computed: {
		to() {
			let highBound = this.from + this.pagination.perPage;
			if (this.total < highBound) {
				highBound = this.total;
			}
			return highBound;
		},
		from() {
			return this.pagination.perPage * (this.pagination.currentPage - 1);
		},
		total() {
			return this.pagination.total;
		},
		perPage() {
			return this.pagination.perPage;
		},
		currentPage() {
			return this.pagination.currentPage;
		}
	},
	data() {
		return {
			pagination: {
				perPage: 5,
				currentPage: 1,
				perPageOptions: [5, 10, 25, 50],
				total: 0
			},
			searchQuery: "",
			propsToSearch: ["name"],
			tableColumns: [
				{
					prop: "name",
					label: "Name",
					minWidth: 200
				},
				{
					prop: "tier",
					label: "Tier",
					minWidth: 250
				}
			],
			tableData: []
		};
	},
	created() {
		this.getCompanies();
	},
	methods: {
		async getCompanies() {
			const result = await this.$company.getCompanies({
				page: this.pagination.currentPage,
				pageSize: this.pagination.perPage,
				searchQuery: this.searchQuery
			});
			if (result.status === true) {
				this.pagination.total = result.data.count;
				this.tableData = result.data.results;
			}
		},
		handleEdit(index, row) {
			Swal.fire({
				title: `You want to edit ${row.name}`,
				buttonsStyling: false,
				confirmButtonClass: "btn btn-info btn-fill"
			});
		},
		handleDelete(index, row) {
			Swal.fire({
				title: "Are you sure?",
				text: `You won't be able to revert this!`,
				type: "warning",
				showCancelButton: true,
				confirmButtonClass: "btn btn-success btn-fill",
				cancelButtonClass: "btn btn-danger btn-fill",
				confirmButtonText: "Yes, delete it!",
				buttonsStyling: false
			}).then((result) => {
				if (result.value) {
					this.deleteRow(row);
					Swal.fire({
						title: "Deleted!",
						text: `You deleted ${row.name}`,
						type: "success",
						confirmButtonClass: "btn btn-success btn-fill",
						buttonsStyling: false
					});
				}
			});
		},
		async deleteRow(row) {
			const result = await this.$company.deleteCompany(+row.id);
			if (result.status) {
				let indexToDelete = this.tableData.findIndex(
					(tableRow) => tableRow.id === row.id
				);
				if (indexToDelete >= 0) {
					this.tableData.splice(indexToDelete, 1);
				}
			}
		}
	},
	watch: {
		searchQuery(value) {
			let result = this.tableData;
			if (value !== "") {
				result = this.fuseSearch.search(this.searchQuery);
			}
			this.searchedData = result;
		},
		currentPage() {
			this.getCompanies();
		},
		perPage() {
			this.getCompanies();
		}
	}
};
</script>
<style></style>
