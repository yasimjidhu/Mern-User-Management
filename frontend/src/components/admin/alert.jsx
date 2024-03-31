import Swal from 'sweetalert2';

const handleDeleteUser = async () => {
  // Show SweetAlert confirmation dialog
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  })
  if(result.isConfirmed){
    return true
  }else{
    return false
  }
}
export default handleDeleteUser